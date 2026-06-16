const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Inventory = require("../../models/Inventory");
const itemsData = require("../../../data/items.json");

const CHEST_REWARDS = {
  comun: { min: 7000, max: 9000, emoji: "<:cofrecomun:890255012138205255>" },
  raro: { min: 10000, max: 110000, emoji: "<:cofreraro:890255268611518495>" },
  epico: { min: 100000, max: 1100000, emoji: "<:cofreepico:890255074419413032>" },
  hyper: { min: 1000000, max: 11000000, emoji: "<:cofrehyper:890255128827928616>" },
  legendario: { min: 10000000, max: 110000000, emoji: "<:cofrelegendario:890255198520492072>" },
};

const CHEST_NAMES = {
  comun: ["cofre comun", "cofre común", "comun", "común"],
  raro: ["cofre raro", "raro"],
  epico: ["cofre epico", "cofre épico", "epico", "épico"],
  hyper: ["cofre hyper", "hyper"],
  legendario: ["cofre legendario", "cofre legendary", "legendario", "legendary", "legend"],
};

const NAME_TO_KEY = {};
for (const [key, names] of Object.entries(CHEST_NAMES)) {
  for (const n of names) NAME_TO_KEY[n] = key;
}

module.exports = {
  name: "open",
  alias: ["abrir"],
  description: "Abre un cofre de tu inventario",
  options: [
    { name: "cofre", description: "Nombre del cofre a abrir", type: 3, required: true },
    { name: "cantidad", description: "Cantidad a abrir", type: 4, required: false },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let chestName, cantidad = 1;
    if (isSlash) {
      chestName = messageOrInteraction.options.getString("cofre").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      chestName = args.slice(0, 2).join(" ").toLowerCase();
      cantidad = parseInt(args[2]) || 1;
    }

    if (!chestName) {
      const reply = "Necesitas decirme que cofre deseas abrir...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const chestKey = NAME_TO_KEY[chestName];
    if (!chestKey) {
      const reply = "No e podido encontrar ese cofre";
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

    const invKey = `cofre_${chestKey}`;
    const owned = inv.items.get(invKey) || 0;

    if (owned === 0) {
      const reply = "No tienes este cofre en tu inventario...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const openQty = Math.min(cantidad, owned);
    const reward = CHEST_REWARDS[chestKey];
    let totalBerries = 0;

    for (let i = 0; i < openQty; i++) {
      totalBerries += Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
    }

    profile.bank.cash += totalBerries;
    await profile.save();

    const remaining = owned - openQty;
    if (remaining <= 0) inv.items.delete(invKey);
    else inv.items.set(invKey, remaining);
    await inv.save();

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} Cofres`, iconURL: author.displayAvatarURL() })
      .setDescription(`**${reward.emoji} ${openQty > 1 ? `Has abierto ${openQty} Cofres` : "Cofre Abierto"}**\n<:berri:907114454108491806> ${totalBerries.toLocaleString("en-US")} Berries`)
      .setColor("Gold");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
