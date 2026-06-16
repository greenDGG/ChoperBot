const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const itemsData = require("../../data/items.json");

const ITEMS_MAP = {};
for (const i of itemsData) {
  ITEMS_MAP[String(i.id).toLowerCase()] = i;
  ITEMS_MAP[i.name.toLowerCase()] = i;
}

const GIFTABLE = ["food", "fruit", "chest", "special"];

module.exports = {
  name: "regalar",
  alias: ["give", "gift"],
  description: "Regala un objeto a otro jugador",
  options: [
    { name: "usuario", description: "Usuario a regalar", type: 6, required: true },
    { name: "item", description: "Nombre del objeto", type: 3, required: true },
    { name: "cantidad", description: "Cantidad", type: 4, required: false },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let targetUser, itemName, cantidad = 1;

    if (isSlash) {
      targetUser = messageOrInteraction.options.getUser("usuario");
      itemName = messageOrInteraction.options.getString("item").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      targetUser = messageOrInteraction.mentions?.users?.first();
      if (targetUser) args.shift();
      itemName = args.join(" ").toLowerCase();
    }

    if (!targetUser) {
      const reply = "Debes Mencionar A Alguien...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetUser.id === author.id) {
      const reply = "Que Te Quieres Regalar?...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (!itemName) {
      const reply = "Debes Decir La Cosa Que Quieras Regalar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const item = ITEMS_MAP[itemName];
    if (!item) {
      const reply = "No He Encontrado Ese Objeto...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (!GIFTABLE.includes(item.type)) {
      const reply = "Ese objeto no se puede regalar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const senderProfile = await Profile.findOne({ id: author.id });
    if (!senderProfile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const receiverProfile = await Profile.findOne({ id: targetUser.id });
    if (!receiverProfile) {
      const reply = "Ese usuario no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let senderInv = await Inventory.findOne({ id: author.id });
    if (!senderInv) senderInv = await Inventory.create({ id: author.id });

    let receiverInv = await Inventory.findOne({ id: targetUser.id });
    if (!receiverInv) receiverInv = await Inventory.create({ id: targetUser.id });

    const key = String(item.id);
    const owned = senderInv.items.get(key) || 0;

    if (cantidad > owned) {
      const reply = "No Tienes Suficiente De Ese Objeto...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const remaining = owned - cantidad;
    if (remaining <= 0) senderInv.items.delete(key);
    else senderInv.items.set(key, remaining);
    await senderInv.save();

    const current = receiverInv.items.get(key) || 0;
    receiverInv.items.set(key, current + cantidad);
    await receiverInv.save();

    const reply = `<@${targetUser.id}>, <@${author.id}> Te Ha Regalado ${item.emoji || ""} **${item.name}** x${cantidad}`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
