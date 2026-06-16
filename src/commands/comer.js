const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const fruitsData = require("../../data/fruits.json");

const FRUIT_MAP = {};
for (const f of fruitsData) {
  FRUIT_MAP[f.key] = f;
  FRUIT_MAP[f.name.toLowerCase()] = f;
}

const FOOD = {
  sushi: { heal: 25, type: "health", emoji: "🍣" },
  gomitas: { heal: 2, type: "energy", emoji: "🍬" },
  paleta: { heal: 5, type: "energy", emoji: "🍭" },
  omusubi: { heal: 10, type: "health", emoji: "🍙" },
  carne: { heal: 20, type: "health", emoji: "🥩" },
};

module.exports = {
  name: "comer",
  alias: ["eat"],
  description: "Come comida o fruta del diablo para recuperar vida/energía",
  options: [
    { name: "item", description: "Qué quieres comer", type: 3, required: true },
    { name: "cantidad", description: "Cantidad", type: 4, required: false },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let item, cantidad = 1;
    if (isSlash) {
      item = messageOrInteraction.options.getString("item").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      const foodKeys = Object.keys(FOOD);
      if (foodKeys.includes(args[0]?.toLowerCase())) {
        item = args[0].toLowerCase();
        cantidad = parseInt(args[1]) || 1;
      } else {
        item = args.join(" ").toLowerCase();
      }
    }

    if (!item) {
      const reply = "Que deceas comer?";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let inv = await Inventory.findOne({ id: author.id });
    if (!inv) inv = await Inventory.create({ id: author.id });

    const fruit = FRUIT_MAP[item];
    if (fruit) {
      return eatFruit(messageOrInteraction, isSlash, author, profile, inv, fruit);
    }

    const food = FOOD[item];
    if (!food) {
      const reply = `No encuentro ${item} en tu inventario`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const key = String(item);
    const owned = inv.items.get(key) || 0;
    if (cantidad > owned) {
      const reply = "No Tienes Esta Comida En Tu Inventario...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const statType = food.type === "health" ? "health" : "energy";
    const current = profile.stats[statType].current;
    const max = profile.stats[statType].max;

    if (current >= max) {
      const reply = `Ya tienes la ${statType} al Maximo`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const totalHeal = food.heal * cantidad;
    const newVal = Math.min(current + totalHeal, max);
    profile.stats[statType].current = newVal;
    await profile.save();

    const remaining = owned - cantidad;
    if (remaining <= 0) inv.items.delete(key);
    else inv.items.set(key, remaining);
    await inv.save();

    const reply = `**${profile.name}**, Ha Comido ${cantidad} ${food.emoji} **${item}** y recuperó ${statType === "health" ? "❤️" : "⚡"}${newVal - current} de ${statType}`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};

async function eatFruit(msgOrInt, isSlash, author, profile, inv, fruit) {
  const fruitKey = `fruit_${fruit.key}`;
  const owned = inv.items.get(fruitKey) || 0;

  if (owned === 0) {
    const reply = "No Tienes Esta Fruta En Tu Inventario...";
    if (isSlash) return msgOrInt.editReply({ content: reply });
    return msgOrInt.channel.send(reply);
  }

  if (profile.equipped.fruit > 0) {
    const reply = "Ya Te Has Comido Una Fruta, **No Puedes Comer 2**";
    if (isSlash) return msgOrInt.editReply({ content: reply });
    return msgOrInt.channel.send(reply);
  }

  profile.stats.atk += fruit.atk;
  profile.stats.def += fruit.def;
  profile.equipped.fruit = fruit.id;
  await profile.save();

  inv.items.delete(fruitKey);
  await inv.save();

  const embed = new EmbedBuilder()
    .setDescription(`**${profile.name}**, Se Ha Comido **${fruit.emoji || ""} ${fruit.name}**\n🗡️ ATK +${fruit.atk}\n🛡️ DEF +${fruit.def}`)
    .setColor("Green");

  if (isSlash) return msgOrInt.editReply({ embeds: [embed] });
  msgOrInt.channel.send({ embeds: [embed] });
}
