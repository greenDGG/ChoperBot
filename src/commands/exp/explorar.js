const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");
const Prison = require("../../models/Prison");
const Inventory = require("../../models/Inventory");
const rolesData = require("../../../data/roles.json");
const AREAS = require("../../../data/areas.json");

const CREW_MAXP = (n) => 5 * (n ** 5) + 20 * n + 500;
const ROLE_BONUS = {};
for (const r of rolesData) {
  ROLE_BONUS[r.id] = { vd: r.health, at: r.atk, def: r.def };
}



module.exports = {
  name: "explore",
  alias: ["exp"],
  description: "Explora las islas en busca de tesoros",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    const ch = isSlash ? null : messageOrInteraction.channel;
    let sent = false;
    const sendMsg = async (content, embed) => {
      if (isSlash) {
        if (!sent) { sent = true; return messageOrInteraction.editReply(content ? { content, embeds: embed ? [embed] : [] } : { embeds: [embed] }); }
        return messageOrInteraction.followUp(content ? { content, embeds: embed ? [embed] : [] } : { embeds: [embed] });
      }
      return embed ? ch.send({ content, embeds: [embed] }) : ch.send(content);
    };

    const prison = await Prison.findOne({ id: author.id });
    if (prison && prison.atrapado === 1) {
      return sendMsg(`Estas atrapado en una carcel nivel ${prison.nivel}, pidele a tus nakamas que te salven`);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      return sendMsg("Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`");
    }

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const isWeekend = [0, 6].includes(new Date().getDay());
    const cdTime = isWeekend ? 30000 : 60000;
    const now = Date.now();
    if (cd.explore && now - cd.explore < cdTime) {
      const remaining = cdTime - (now - cd.explore);
      const converted = { m: Math.floor(remaining / 60000), s: Math.floor((remaining % 60000) / 1000) };
      return sendMsg(`Ya Has Explorado, Espera Unos **${converted.m}m ${converted.s}s...**`);
    }

    const areaId = Math.min(profile.area.areas || 1, 20);
    const area = AREAS[areaId - 1];
    const n = profile.role === 2 ? 2 : 1;

    const min = areaId <= 2 ? area.min * n : area.min;
    const max = areaId <= 2 ? area.max * n : area.max;
    const monedas = Math.floor(Math.random() * (max - min + 1)) + min;
    const monedaFin = isWeekend ? monedas * 2 : monedas;
    const xpMin = areaId <= 2 ? area.xpMin * n : area.xpMin;
    const xpMax = areaId <= 2 ? area.xpMax * n : area.xpMax;
    const xpRoll = Math.floor(Math.random() * (xpMax - xpMin + 1)) + xpMin;
    const xpFin = isWeekend ? xpRoll * 3 : xpRoll;
    const hpLoss = area.hpSubDef
      ? Math.max(0, Math.floor(Math.random() * (area.hpMax - area.hpMin + 1)) + area.hpMin - (profile.stats.def || 0))
      : Math.floor(Math.random() * (area.hpMax - area.hpMin + 1)) + area.hpMin;
    const enerLoss = Math.floor(Math.random() * (area.enerMax - area.enerMin + 1)) + area.enerMin;
    const place = area.places[Math.floor(Math.random() * area.places.length)];

    const marineRoll = Math.round(Math.random() * 100);
    if (marineRoll <= area.marineChance) {
      cd.explore = now;
      await cd.save();
      const atk = profile.stats.atk;
      const fer = area.marineFue[Math.floor(Math.random() * area.marineFue.length)];
      const bo = Math.round(Math.random() * area.marineBo);
      const x = Math.round(Math.random() * 100);

      if (atk > fer) {
        const xpGain = isWeekend ? x * 2 : x;
        profile.progress.xp += xpGain;
        profile.progress.bounty += isWeekend ? bo * 2 : bo;
        await profile.save();
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, Has derrotado a la marina.\n y ganaste ${xpGain} XP`).setColor("Green"));
      }
      const pp = [1, 2, 3, 1];
      const ppr = pp[Math.floor(Math.random() * pp.length)];
      if (ppr === 3) {
        profile.progress.xp += x;
        profile.progress.bounty += bo;
        await profile.save();
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, Has derrotado a la marina.\n y has ganado ${x} XP`).setColor("Green"));
      }
      if (ppr === 2) {
        profile.stats.health.current = 1;
        await profile.save();
        await Prison.findOneAndUpdate({ id: author.id }, { atrapado: 1, nivel: 1, fuerza: fer }, { upsert: true });
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, La marina te ha derrotado, y te ha llevado a una carcel nivel I`).setColor("Red"));
      }
      profile.stats.health.current = 1;
      await profile.save();
      return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, La marina te ha derrotado, pero te has logrado escapar.\nTu vida se ha reducido a 1.`).setColor("Orange"));
    }

    const chestRoll = Math.floor(Math.random() * 100);
    if (chestRoll <= 10) {
      profile.stats.health.current = Math.max(0, profile.stats.health.current - hpLoss);
      if (profile.stats.health.current <= 0) {
        profile.stats.health.current = 1;
        await profile.save();
        return sendMsg(`**${profile.name}** Se ha quedado sin vida y a perdido la conciencia...`);
      }
      profile.progress.xp += xpFin;
      profile.bank.cash += monedaFin;

      let inv = await Inventory.findOne({ id: author.id });
      if (!inv) inv = await Inventory.create({ id: author.id });
      inv.items.set("cofre_comun", (inv.items.get("cofre_comun") || 0) + 1);
      await inv.save();

      const embed = new EmbedBuilder()
        .setDescription(`**${profile.name}** A Salido A Explorar **${place}**\nGanó <:berri:907114454108491806>${monedaFin.toLocaleString('en-US')} Berris y ${xpFin} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${hpLoss} HP, HP restante es ${profile.stats.health.current}/${profile.stats.health.max}`)
        .setColor("Green");
      await sendMsg("Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común", embed);
      cd.explore = now;
      await profile.save();
      await cd.save();
      return;
    }

    profile.stats.health.current -= hpLoss;
    if (profile.stats.health.current <= 0) {
      return sendMsg(`**${profile.name}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`);
    }

    profile.stats.energy.current -= enerLoss;
    if (profile.stats.energy.current <= 0) {
      profile.stats.energy.current = 1;
      await profile.save();
      return sendMsg(`**${profile.name}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`);
    }

    profile.bank.cash += monedaFin;
    profile.progress.xp += xpFin;

    const embed = new EmbedBuilder()
      .setDescription(`**${profile.name}** A Salido A Explorar **${place}**\nGanó <:berri:907114454108491806>${monedaFin.toLocaleString('en-US')} Berris y ${xpFin} XP\nPerdió ❤️${hpLoss} HP, Le queda ${profile.stats.health.current}/${profile.stats.health.max}\nGasto ⚡${enerLoss} de Energia, Le queda ${profile.stats.energy.current}/${profile.stats.energy.max}`)
      .setColor("Green");
    if (isWeekend) embed.setFooter({ text: "Recompensa De Finde x2" });
    await sendMsg(null, embed);

    if (profile.crewId) {
      const Crew = require("../../models/Crew");
      const crew = await Crew.findOne({ id: profile.crewId });
      if (crew) {
        crew.xp += xpFin;
        const crewMaxp = CREW_MAXP(crew.level);
        if (crew.xp >= crewMaxp) {
          crew.level += 1;
          crew.xp = 0;
          await sendMsg(`Felicidades, el Crew **${crew.name}** Acaba de subir al nivel **${crew.level}**!!!`);
        }
        await crew.save();
      }
    }

    const maxp = profile.progress.level * 180;
    if (profile.progress.xp >= maxp) {
      profile.progress.level += 1;
      profile.progress.xp = 0;
      const bonus = ROLE_BONUS[profile.role] || { vd: 5, at: 2, def: 2 };
      profile.stats.atk += bonus.at;
      profile.stats.def += bonus.def;
      profile.stats.health.max += bonus.vd;
      profile.stats.energy.max += 1;
      profile.stats.health.current = profile.stats.health.max;
      profile.stats.energy.current = profile.stats.energy.max;
      await sendMsg(`Felicidades, **${profile.name}** Acabas De Subir Al Nivel **${profile.progress.level}**!!!`);
    }

    cd.explore = now;
    await profile.save();
    await cd.save();
  },
};
