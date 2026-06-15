const Profile = require("../models/Profile");

module.exports = {
  name: "give",
  alias: [],
  description: "Da berries a otro usuario",
  options: [
    { name: "usuario", description: "Usuario a darle berries", type: 6, required: true },
    { name: "monto", description: "Cantidad de berries", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    let user, monto;

    if (isSlash) {
      user = messageOrInteraction.options.getUser("usuario");
      monto = messageOrInteraction.options.getInteger("monto");
    } else {
      user = messageOrInteraction.mentions.users.first();
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      monto = parseInt(args[2]);
    }

    if (!user) {
      const reply = "Debes Mencionar A Alguien...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.reply(reply);
    }

    if (user.id === author.id) {
      const reply = "Que Te Quieres Dar?...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.reply(reply);
    }

    if (!monto || isNaN(monto)) {
      const reply = "Debes Decir El Monto Que Quieres Dar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.reply(reply);
    }

    const senderProfile = await Profile.findOne({ id: author.id });
    if (!senderProfile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const m = Math.abs(monto);
    if (m > senderProfile.bank.cash) {
      const reply = "No puedes dar mas de lo que tienes...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const targetProfile = await Profile.findOne({ id: user.id });
    if (!targetProfile) {
      const reply = "Ese usuario no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    senderProfile.bank.cash -= m;
    targetProfile.bank.cash += m;
    await senderProfile.save();
    await targetProfile.save();

    const reply = `**${senderProfile.name}**, le has dado <:berri:907114454108491806>${m.toLocaleString("en-US")} a **${targetProfile.name}**`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
