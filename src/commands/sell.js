const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const fishData = require("../../data/fishs.json");
const itemsData = require("../../data/items.json");

const FISH_MAP = {};
for (const f of fishData) {
  FISH_MAP[f.id] = f;
  FISH_MAP[f.name.toLowerCase()] = f;
}

const ITEMS_SELLABLE = itemsData.filter(i => i.sellable);
const ITEMS_MAP = {};
for (const i of ITEMS_SELLABLE) {
  ITEMS_MAP[String(i.id).toLowerCase()] = i;
  ITEMS_MAP[i.name.toLowerCase()] = i;
}

module.exports = {
  name: "sell",
  alias: ["vender"],
  description: "Vende peces de tu inventario",
  options: [
    { name: "pez", description: "Nombre del pez a vender", type: 3, required: true },
    { name: "cantidad", description: "Cantidad a vender", type: 4, required: false },
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

    let pezName, cantidad;
    if (isSlash) {
      pezName = messageOrInteraction.options.getString("pez").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      pezName = args[0]?.toLowerCase();
      cantidad = parseInt(args[1]) || 1;
    }

    if (!pezName) {
      const reply = "¿Que Deseas Vender?";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let fishEntry = null;
    for (const f of fishData) {
      if (f.id === pezName || f.name.toLowerCase() === pezName) {
        fishEntry = f;
        break;
      }
    }

    if (!fishEntry) fishEntry = ITEMS_MAP[pezName];

    if (!fishEntry) {
      const reply = `Lo siento pero no compramos **${pezName}**.`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const inv = await Inventory.findOne({ id: author.id });
    const owned = inv ? (inv.items.get(fishEntry.id) || 0) : 0;

    if (cantidad > owned) {
      const reply = "No puedes vender mas de lo que tienes";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const totalValue = fishEntry.value * cantidad;
    profile.bank.cash += totalValue;
    await profile.save();

    const remaining = owned - cantidad;
    if (remaining <= 0) {
      inv.items.delete(fishEntry.id);
    } else {
      inv.items.set(fishEntry.id, remaining);
    }
    await inv.save();

    const reply = `Has Vendido ${cantidad > 1 ? `${cantidad}` : "1"} ${fishEntry.emoji} **${fishEntry.name}** por <:berri:907114454108491806>${totalValue.toLocaleString("en-US")} Berries`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
