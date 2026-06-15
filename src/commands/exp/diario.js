const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");

const REWARDS = [
  null,
  { min: 5000, max: 15000 },
  { min: 20000, max: 30000 },
  { min: 30000, max: 40000 },
  { min: 50000, max: 70000 },
  { min: 70000, max: 85000 },
  { min: 90000, max: 100000 },
  { min: 100000, max: 115000 },
  { min: 150000, max: 250000 },
  { min: 300000, max: 500000 },
  { min: 500000, max: 750000 },
  { min: 750000, max: 1000000 },
  { min: 1000000, max: 1250000 },
  { min: 1250000, max: 1500000 },
  { min: 1500000, max: 1750000 },
  { min: 1750000, max: 2000000 },
  { min: 2000000, max: 2500000 },
  { min: 2500000, max: 3000000 },
  { min: 3000000, max: 4000000 },
  { min: 4000000, max: 5000000 },
  { min: 5000000, max: 6500000 },
];

module.exports = {
  name: "diario",
  alias: ["daily"],
  description: "Reclama tu recompensa diaria",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const now = Date.now();
    if (cd.daily && now - cd.daily < 86400000) {
      const timeLeft = cd.daily + 86400000 - now;
      const h = Math.floor(timeLeft / 3600000);
      const m = Math.floor((timeLeft % 3600000) / 60000);
      const s = Math.floor((timeLeft % 60000) / 1000);
      const reply = `Ya Has Reclamado La Recompenza Diaria, Debes Esperar **${h}h ${m}m ${s}s...**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "No tienes un perfil. Usa `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const area = profile.area.areas || 1;
    const reward = REWARDS[area] || REWARDS[1];
    const isWeekend = [0, 6].includes(new Date().getDay());
    let berri = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
    if (isWeekend && area === 1) berri *= 2;

    const energia = Math.abs(profile.stats.energy.current - profile.stats.energy.max);
    profile.stats.energy.current = Math.min(profile.stats.energy.current + energia, profile.stats.energy.max);
    profile.bank.cash += berri;
    cd.daily = now;
    await profile.save();
    await cd.save();

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Recompensa Diaria" })
      .setDescription(`Recompensas Area **#${area}**\n**<:berri:907114454108491806>${berri.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
      .setColor("Random");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
