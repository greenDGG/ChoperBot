const { EmbedBuilder } = require("discord.js");
const Cooldown = require("../../models/Cooldown");

module.exports = {
  name: "cooldown",
  alias: ["cd"],
  description: "Muestra tus tiempos de espera",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    const cd = await Cooldown.findOne({ id: author.id });
    if (!cd) {
      const reply = "No tienes cooldowns registrados.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const fields = [];
    const now = Date.now();
    const types = {
      daily: "Diario",
      weekly: "Semanal",
      work: "Trabajar",
      rob: "Robar",
      explore: "Explorar",
      duel: "Duelo",
    };

    for (const [key, label] of Object.entries(types)) {
      const remaining = cd[key] ? cd[key] - now : 0;
      if (remaining > 0) {
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        fields.push({ name: label, value: `${h}h ${m}m ${s}s`, inline: true });
      } else {
        fields.push({ name: label, value: "Listo", inline: true });
      }
    }

    const embed = new EmbedBuilder().setTitle("Cooldowns").addFields(fields).setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
