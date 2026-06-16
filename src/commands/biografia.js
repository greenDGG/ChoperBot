const Profile = require("../models/Profile");

module.exports = {
  name: "biografia",
  alias: ["add-bio", "bio"],
  description: "Establece tu biografía",
  options: [
    { name: "texto", description: "Texto de la biografía", type: 3, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let bio;
    if (isSlash) {
      bio = messageOrInteraction.options.getString("texto");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      bio = args.join(" ");
    }

    if (!bio) {
      const reply = "Nesecitas escribir una biografia para establecer.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (bio.length > 1000) {
      const reply = `Has Superado El Limite de caracteres **1000**\nHas Escrito ${bio.length} caracteres.`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    profile.bio = bio;
    await profile.save();

    const reply = "Biografia Establecida Con Exito.";
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
