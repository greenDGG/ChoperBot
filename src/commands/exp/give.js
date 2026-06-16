const Profile = require("../../models/Profile");

module.exports = {
  name: "give",
  alias: ["dar"],
  description: "Da berries a otro jugador",
  options: [
    { name: "usuario", description: "Usuario a dar berries", type: 6, required: true },
    { name: "monto", description: "Cantidad de berries", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let targetUser, monto;
    if (isSlash) {
      targetUser = messageOrInteraction.options.getUser("usuario");
      monto = messageOrInteraction.options.getInteger("monto");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      targetUser = messageOrInteraction.mentions?.users?.first();
      monto = parseInt(args[1]);
    }

    if (!targetUser) {
      const reply = "Debes Mencionar A Alguien...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetUser.id === author.id) {
      const reply = "Que Te Quieres Dar?...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (!monto || isNaN(monto) || monto <= 0) {
      const reply = "Debes Decir El Monto Que Quieres Dar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const sender = await Profile.findOne({ id: author.id });
    if (!sender) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const receiver = await Profile.findOne({ id: targetUser.id });
    if (!receiver) {
      const reply = "Ese usuario no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (monto > sender.bank.cash) {
      const reply = "No puedes dar mas de lo que tienes...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    sender.bank.cash -= monto;
    receiver.bank.cash += monto;
    await sender.save();
    await receiver.save();

    const reply = `**${sender.name}**, le has dado <:berri:907114454108491806>${monto.toLocaleString("en-US")} a **${receiver.name}**`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
