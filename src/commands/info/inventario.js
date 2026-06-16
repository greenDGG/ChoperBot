const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Inventory = require("../../models/Inventory");
const itemsData = require("../../../data/items.json");
const fishData = require("../../../data/fishs.json");
const fruitsData = require("../../../data/fruits.json");

const ITEM_MAP = {};
for (const i of itemsData) ITEM_MAP[i.id] = i;
const FISH_MAP = {};
for (const f of fishData) FISH_MAP[f.id] = f;
const FRUIT_MAP = {};
for (const f of fruitsData) FRUIT_MAP[f.key] = f;

module.exports = {
  name: "inventario",
  alias: ["i", "inv"],
  description: "Muestra tu inventario",
  options: [
    { name: "usuario", description: "Usuario a ver inventario", type: 6, required: false },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let user;
    if (isSlash) {
      user = messageOrInteraction.options.getUser("usuario") || author;
    } else {
      user = messageOrInteraction.mentions.users.first() || author;
    }

    const profile = await Profile.findOne({ id: user.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const inv = await Inventory.findOne({ id: user.id });
    const items = [], foods = [], fish = [], fruits = [];

    if (inv && inv.items && inv.items.size > 0) {
      for (const [key, qty] of inv.items) {
        const fromData = ITEM_MAP[key];
        const fishEntry = FISH_MAP[key];

        if (key.startsWith("cofre_") || (fromData && fromData.type === "chest")) {
          const name = fromData ? fromData.name : key;
          const emoji = fromData?.emoji || "📦";
          items.push(`${emoji} **${name}** x${qty}`);
        } else if (fromData && fromData.type === "fruit") {
          const emoji = fromData.emoji || "🍎";
          items.push(`${emoji} **${fromData.name}** x${qty}`);
        } else if (fromData && fromData.type === "special") {
          const emoji = fromData.emoji || "🎫";
          items.push(`${emoji} **${fromData.name}** x${qty}`);
        } else if (fromData && fromData.type === "fishing_rod") {
          items.push(`🎣 **${fromData.name}** x${qty}`);
        } else if (fishEntry) {
          fish.push(`${fishEntry.emoji} **${fishEntry.name}** x${qty}`);
        } else if (fromData && fromData.type === "food") {
          const emoji = fromData.emoji || "🍽️";
          foods.push(`${emoji} **${fromData.name}** x${qty}`);
        } else if (key.startsWith("fruit_")) {
          const fk = key.replace("fruit_", "");
          const fruit = FRUIT_MAP[fk];
          if (fruit) {
            fruits.push(`${fruit.emoji || "🍎"} **${fruit.name}** x${qty}`);
          } else {
            fruits.push(`🍎 **Fruta #${fk}** x${qty}`);
          }
        } else if (fromData) {
          items.push(`${fromData.emoji || "📦"} **${fromData.name}** x${qty}`);
        } else {
          items.push(`📦 **${key}** x${qty}`);
        }
      }
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} Inventario`, iconURL: user.displayAvatarURL() })
      .setColor("Green");

    let fieldCount = 0;
    if (items.length) { embed.addFields({ name: "Items", value: items.join("\n"), inline: true }); fieldCount++; }
    if (fish.length) { embed.addFields({ name: "🐟 Pescados", value: fish.join("\n"), inline: true }); fieldCount++; }
    if (foods.length) { embed.addFields({ name: "🍽️ Comidas", value: foods.join("\n"), inline: true }); fieldCount++; }
    if (fruits.length) { embed.addFields({ name: "🍎 Frutas", value: fruits.join("\n"), inline: true }); fieldCount++; }

    if (fieldCount === 0) {
      embed.setDescription("Tu inventario está vacío.");
    }

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
