const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "perfil",
  alias: ["profile"],
  description: "Muestra tu perfil o el de otro usuario",
  options: [{ name: "usuario", description: "Usuario a ver", type: 6, required: false }],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    let targetId = author.id;

    if (isSlash) {
      const user = messageOrInteraction.options.getUser("usuario");
      if (user) targetId = user.id;
    }

    const profile = await Profile.findOne({ id: targetId });
    if (!profile) {
      const reply = "Ese usuario no tiene un perfil.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const allProfiles = await Profile.find().sort({ "progress.level": -1 });
    const rank = allProfiles.findIndex((p) => p.id === targetId) + 1;

    const embed = new EmbedBuilder()
      .setTitle(profile.name)
      .addFields(
        { name: "Nivel", value: `${profile.progress.level}`, inline: true },
        { name: "XP", value: `${profile.progress.xp}`, inline: true },
        { name: "Rank", value: `#${rank}`, inline: true },
        { name: "Berries", value: `${profile.bank.cash.toLocaleString()}`, inline: true },
        { name: "Bio", value: profile.bio || "Sin biografía" }
      )
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
