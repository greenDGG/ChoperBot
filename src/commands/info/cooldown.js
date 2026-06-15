const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");

function formatRemaining(ms) {
  if (ms <= 0) return "✅";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 0) return `<:reloj1:911308916779016222> (**${h}h ${m}m**)`;
  return `<:reloj1:911308916779016222> (**${m}m**)`;
}

module.exports = {
  name: "cooldown",
  alias: ["cd"],
  description: "Muestra tus tiempos de espera",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    const profile = await Profile.findOne({ id: author.id });
    const name = profile ? profile.name : author.username;

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const now = Date.now();
    const daily = formatRemaining(cd.daily ? cd.daily + 86400000 - now : 0);
    const weekly = formatRemaining(cd.weekly ? cd.weekly + 604800000 - now : 0);
    const explore = formatRemaining(cd.explore ? cd.explore + 30000 - now : 0);
    const sail = formatRemaining(cd.sail ? cd.sail + 60000 - now : 0);
    const fish = formatRemaining(cd.fish ? cd.fish + 150000 - now : 0);
    const train = formatRemaining(cd.train ? cd.train + 43200000 - now : 0);

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${name} Cooldowns`, iconURL: author.displayAvatarURL() })
      .addFields(
        {
          name: "🎁 Recompensas 🎁",
          value: `${daily} --- **\`Diario\`**\n${weekly} --- **\`Semanal\`**`
        },
        {
          name: "🗡️ Experiencia 🗡️",
          value: `${explore} --- **\`Explorar\`**\n${sail} --- **\`Zarpar\`**\n✅ --- **\`Duelo\`**`
        },
        {
          name: "🌟 Progresos 🌟",
          value: `${fish} --- **\`Pescar\`**\n${train} --- **\`Entrenar\`**`
        }
      )
      .setColor("Random");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
