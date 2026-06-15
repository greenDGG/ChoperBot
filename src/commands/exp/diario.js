const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");

module.exports = {
  name: "diario",
  alias: ["daily"],
  description: "Reclama tu recompensa diaria",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "No tienes un perfil. Usa `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) {
      cd = await Cooldown.create({ id: author.id });
    }

    const now = Date.now();
    if (cd.daily && now - cd.daily < 86400000) {
      const remaining = 86400000 - (now - cd.daily);
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const reply = `Espera ${h}h ${m}m para reclamar tu recompensa diaria.`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const areas = profile.area.areas || 1;
    const isWeekend = [0, 6].includes(new Date().getDay());
    const multiplier = isWeekend ? 2 : 1;
    const reward = 2000 * areas * multiplier;

    profile.bank.cash += reward;
    cd.daily = now;
    await profile.save();
    await cd.save();

    const embed = new EmbedBuilder()
      .setTitle("Recompensa Diaria")
      .setDescription(`Has recibido **${reward.toLocaleString()}** <:berri:907114454108491806>${isWeekend ? "\n\n**¡Bono de fin de semana activo! x2**" : ""}`)
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
