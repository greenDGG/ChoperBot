const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const Crew = require("../models/Crew");
const itemsData = require("../../data/items.json");
const shipsData = require("../../data/ships.json");

const ITEMS_MAP = {};
for (const i of itemsData) {
  ITEMS_MAP[String(i.id).toLowerCase()] = i;
  ITEMS_MAP[i.name.toLowerCase()] = i;
}
const SHIPS_MAP = {};
for (const s of shipsData) {
  SHIPS_MAP[String(s.id).toLowerCase()] = s;
  SHIPS_MAP[s.name.toLowerCase()] = s;
}

const ROD_ORDER = [3001, 3002, 3003, 3004, 3005];
const ROD_NAMES = { 3001: "I", 3002: "II", 3003: "III", 3004: "IV", 3005: "V" };
const ROD_PRICES = { 3001: 20000, 3002: 60000, 3003: 100000, 3004: 200000, 3005: 500000 };

module.exports = {
  name: "comprar",
  alias: ["buy"],
  description: "Compra objetos de la tienda",
  options: [
    { name: "item", description: "Nombre del item a comprar", type: 3, required: true },
    { name: "cantidad", description: "Cantidad", type: 4, required: false },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let itemName, cantidad = 1;
    if (isSlash) {
      itemName = messageOrInteraction.options.getString("item").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      itemName = args[0]?.toLowerCase();
      cantidad = parseInt(args[1]) || 1;
    }

    if (!itemName) {
      const reply = "El uso correcto de este comando es `op!buy [item]`\nVea lo que puede comprar con `op!shop`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let item = ITEMS_MAP[itemName];
    let isShip = false;

    if (!item) {
      item = SHIPS_MAP[itemName];
      isShip = true;
    }

    if (!item) {
      const reply = "Lo Sentimos, Pero No He Encontrado Ese Objeto En La Tienda.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let inv = await Inventory.findOne({ id: author.id });
    if (!inv) inv = await Inventory.create({ id: author.id });

    if (isShip) {
      const price = item.price || 0;
      if (profile.bank.cash < price) {
        const reply = "No tienes suficiente dinero para comprar esto...";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }
      profile.bank.cash -= price;
      profile.equipped.ship = item.id;
      await profile.save();

      if (profile.crewId) {
        const crew = await Crew.findOne({ id: profile.crewId });
        if (crew && crew.ownerId === author.id) {
          crew.maxPlayers = item.capacity;
          await crew.save();
        }
      }

      const reply = `Has Comprado ${item.emoji || ""} **${item.name}** por <:berri:907114454108491806>${price.toLocaleString("en-US")} Berries`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const price = item.price || item.value || 0;

    if (item.type === "fishing_rod") {
      await handleRodPurchase(messageOrInteraction, isSlash, author, profile, inv, item);
      return;
    }

    if (item.type === "fruit") {
      const fruitKey = item.fruitKey || item.id;
      const limitKey = `fruit_${fruitKey}`;
      const owned = inv.items.get(limitKey) || 0;
      if (owned >= (item.limit || 1)) {
        const reply = "Lo Sentimos Pero Este Articulo Se Agoto...";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }
      if (profile.bank.cash < price) {
        const reply = "No tienes suficiente dinero para comprar esto.";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }
      profile.bank.cash -= price;
      await profile.save();
      inv.items.set(limitKey, 1);
      const rawKey = String(item.id);
      inv.items.set(rawKey, (inv.items.get(rawKey) || 0) + 1);
      await inv.save();
      const reply = `Has Comprado ${item.emoji || ""} **${item.name}** con éxito por <:berri:907114454108491806>${price.toLocaleString("en-US")} Berries`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (profile.bank.cash < price * cantidad) {
      const reply = "No tienes suficiente dinero para comprar esto.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    profile.bank.cash -= price * cantidad;
    await profile.save();
    const key = String(item.id);
    const current = inv.items.get(key) || 0;
    inv.items.set(key, current + cantidad);
    await inv.save();

    const reply = `${cantidad > 1 ? `${cantidad}x` : ""} ${item.emoji || ""} **${item.name}** comprado con éxito por <:berri:907114454108491806>${(price * cantidad).toLocaleString("en-US")} Berries`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};

async function handleRodPurchase(msgOrInt, isSlash, author, profile, inv, item) {
  const currentRodId = getCurrentRodId(inv);
  const rodPrice = ROD_PRICES[item.id] || item.price || 20000;

  if (currentRodId === item.id) {
    const reply = "Ya posees esta caña de pescar";
    if (isSlash) return msgOrInt.editReply({ content: reply });
    return msgOrInt.channel.send(reply);
  }

  if (profile.bank.cash < rodPrice) {
    const reply = "No tienes suficiente dinero para comprar esta caña";
    if (isSlash) return msgOrInt.editReply({ content: reply });
    return msgOrInt.channel.send(reply);
  }

  const rodName = `${item.emoji || ""} ${item.name}`;

  if (currentRodId && ROD_ORDER.indexOf(currentRodId) >= ROD_ORDER.indexOf(item.id)) {
    const reply = `Tienes una **Caña ${ROD_NAMES[currentRodId] || ""}** que es igual o mejor.`;
    if (isSlash) return msgOrInt.editReply({ content: reply });
    return msgOrInt.channel.send(reply);
  }

  if (currentRodId) {
    const sent = isSlash
      ? await msgOrInt.editReply({ content: `Tienes una caña, ¿quieres cambiarla por la **${rodName}**?\n\`si/no\``, fetchReply: true })
      : await msgOrInt.channel.send(`Tienes una caña, ¿quieres cambiarla por la **${rodName}**?\n\`si/no\``);

    const filter = (m) => m.author.id === author.id;
    const collector = msgOrInt.channel.createMessageCollector({ filter, time: 30000, max: 1 });
    collector.on("collect", async (msg) => {
      if (msg.content.toLowerCase() === "si") {
        profile.bank.cash -= rodPrice;
        await profile.save();
        inv.items.delete(String(currentRodId));
        const cur = inv.items.get(String(item.id)) || 0;
        inv.items.set(String(item.id), cur + 1);
        await inv.save();
        msg.channel.send(`Has Comprado La **${rodName}** por **${rodPrice.toLocaleString("en-US")}** Berries`);
      } else {
        msg.channel.send(`ok`);
      }
      collector.stop();
    });
    return;
  }

  profile.bank.cash -= rodPrice;
  await profile.save();
  const cur = inv.items.get(String(item.id)) || 0;
  inv.items.set(String(item.id), cur + 1);
  await inv.save();
  const reply = `Has Comprado La **${rodName}** por **${rodPrice.toLocaleString("en-US")}** Berries`;
  if (isSlash) return msgOrInt.editReply({ content: reply });
  msgOrInt.channel.send(reply);
}

function getCurrentRodId(inv) {
  for (const id of ROD_ORDER) {
    if ((inv.items.get(String(id)) || 0) > 0) return id;
  }
  return null;
}
