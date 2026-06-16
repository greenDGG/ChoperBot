const Profile = require("../models/Profile");
const rolesData = require("../../data/roles.json");

const DOCTOR_ROLE = rolesData.find(r => r.id === 6).name;

module.exports = {
  name: "curar",
  alias: [],
  description: "Cura a un usuario (solo Doctor)",
  options: [
    { name: "usuario", description: "Usuario a curar", type: 6, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let user;
    if (isSlash) {
      user = messageOrInteraction.options.getUser("usuario");
    } else {
      user = messageOrInteraction.mentions.users.first();
    }

    if (!user) {
      const reply = "Debes Mencionar A Alguien...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const doctorProfile = await Profile.findOne({ id: author.id });
    if (!doctorProfile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const doctorRole = rolesData.find(r => r.id === doctorProfile.role);
    if (!doctorRole || doctorRole.name !== DOCTOR_ROLE) {
      const reply = "Solo los que tienen rol de doctor pueden usar este comando...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (doctorProfile.stats.energy.current < 5) {
      const reply = "No tienes suficiente energia para curar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const targetProfile = await Profile.findOne({ id: user.id });
    if (!targetProfile) {
      const reply = "Ese usuario no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetProfile.stats.health.current >= targetProfile.stats.health.max) {
      const reply = "Este Usuario Esta De 10";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    targetProfile.stats.health.current = targetProfile.stats.health.max;
    doctorProfile.stats.energy.current -= 5;
    await targetProfile.save();
    await doctorProfile.save();

    const { EmbedBuilder } = require("discord.js");
    const embed = new EmbedBuilder()
      .setDescription(`**${doctorProfile.name}**, Ha Curado A **${targetProfile.name}**`)
      .setColor("Green");
    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
