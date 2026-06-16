const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const rolesData = require("../../../data/roles.json");

const ROLES = {};
for (const r of rolesData) {
  ROLES[r.id] = `${r.emoji} ${r.name}`;
}
const SHIPS = { 0: "Sin Barco", 1: "Balsa", 2: "Fusta", 3: "Goleta", 4: "Coca", 5: "Carabela", 6: "Bergantín", 7: "Carraca", 8: "Nao", 9: "Galera", 10: "Balandra", 11: "Galeón", 12: "Corbeta", 13: "Navío" };
const GUNS = { 0: "Sin Arma", 1: "Kabuto", 2: "Kogatana" };
const FRUITS = { 0: "Sin Fruta", 1: "<:gomugomu:882282753519939584> Gomu Gomu", 2: "<:meramera:882404943716290561> Mera Mera", 3: "<:guragura:885730778800082954> Gura Gura", 4: "<:opeope:885731605673549834> Ope Ope", 5: "<:hitohito:885732137016385566> Hito Hito", 6: "<:barabara:882284030136025119> Bara Bara", 7: "<:yamiyami:882287207149346866> Yami Yami" };

module.exports = {
  name: "perfil",
  alias: ["profile", "p"],
  description: "Muestra tu perfil o el de otro usuario",
  options: [{ name: "usuario", description: "Usuario a ver", type: 6, required: false }],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    let target = author;

    if (isSlash) {
      const user = messageOrInteraction.options.getUser("usuario");
      if (user) target = user;
    } else {
      if (messageOrInteraction.mentions.users.first()) target = messageOrInteraction.mentions.users.first();
    }

    const profile = await Profile.findOne({ id: target.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const maxp = profile.progress.level * 180;
    const pct = Math.round((profile.progress.xp / maxp) * 100);
    const total = profile.bank.cash + profile.bank.deposited;

    const all = await Profile.find().sort({ "progress.level": -1 });
    const rank = all.findIndex((p) => p.id === profile.id) + 1;

    const rolStr = ROLES[profile.role] || `Rol ${profile.role}`;
    const qbarco = SHIPS[profile.equipped.ship] || "Desconocido";
    const qarma = GUNS[profile.equipped.gun] || "Desconocido";
    const qfruta = FRUITS[profile.equipped.fruit] || "Desconocido";

    const embed = new EmbedBuilder()
      .setTitle(rolStr)
      .setAuthor({ name: `${profile.name} Perfil`, iconURL: target.displayAvatarURL() })
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "PROGRESO",
          value: `**Nivel**: ${profile.progress.level} (${pct}%)\n**XP**: ${profile.progress.xp.toLocaleString('en-US')}/${maxp.toLocaleString('en-US')}\n**Isla**: ${profile.area.isla} (${profile.area.mar}) (Isla: ${profile.area.areas} Max: ${profile.area.maxarea})\n**Wanted**: <:berri:907114454108491806>${profile.progress.bounty.toLocaleString('en-US')}`
        },
        {
          name: "ESTADÍSTICAS",
          value: `🗡️ **AT:** ${profile.stats.atk}\n🛡️ **DEF: **${profile.stats.def}\n❤️ **VIDA:** ${profile.stats.health.current}/${profile.stats.health.max}\n⚡ **Energia:** ${profile.stats.energy.current}/${profile.stats.energy.max}`
        },
        {
          name: "EQUIPO",
          value: `${qarma}\n${qfruta}\n${qbarco}`,
          inline: true
        },
        {
          name: "DINERO",
          value: `**Berries:** <:berri:907114454108491806> ${profile.bank.cash.toLocaleString('en-US')}\n**Guardado:** <:berri:907114454108491806> ${profile.bank.deposited.toLocaleString('en-US')}\n**Total:** <:berri:907114454108491806> ${total.toLocaleString('en-US')}`,
          inline: true
        },
        {
          name: "BIOGRAFIA",
          value: "```" + `${profile.bio}` + "```"
        }
      )
      .setColor("#5000a5")
      .setFooter({ text: `RANK: ${rank}` });

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
