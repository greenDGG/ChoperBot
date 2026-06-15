const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");
const Prison = require("../../models/Prison");
const Inventory = require("../../models/Inventory");
const rolesData = require("../../../data/roles.json");

const CREW_MAXP = (n) => 5 * (n ** 5) + 20 * n + 500;
const ROLE_BONUS = {};
for (const r of rolesData) {
  ROLE_BONUS[r.id] = { vd: r.health, at: r.atk, def: r.def };
}

const AREAS = [
  { id: 1, min: 2000, max: 5000, xpMin: 15, xpMax: 30, hpMin: 5, hpMax: 15, hpSubDef: true, enerMin: 1, enerMax: 4, marineChance: 8, marineFue: [20,25,30,10,15,40], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 2, min: 2500, max: 6500, xpMin: 30, xpMax: 60, hpMin: 20, hpMax: 30, enerMin: 2, enerMax: 6, marineChance: 8, marineFue: [40,45,40,20,35,60], marineBo: 60000, marineXp: 153, places: ["Un Cementerio","Un Lago","Un Bunque","Una Playa ⛱️","Un Palacio 🕌","Una Montaña ⛰️"] },
  { id: 3, min: 3000, max: 8000, xpMin: 45, xpMax: 90, hpMin: 50, hpMax: 65, enerMin: 1, enerMax: 5, marineChance: 15, marineFue: [60,65,70,40,55,120], marineBo: 80000, marineXp: 100, places: ["Unas Ruinas","Una Iglesia","Una Cascada","Una Piramide","Una Cueva","Un Arbol"] },
  { id: 4, min: 3500, max: 9500, xpMin: 60, xpMax: 120, hpMin: 20, hpMax: 40, enerMin: 1, enerMax: 4, marineChance: 15, marineFue: [80,85,90,60,75,180], marineBo: 100000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 5, min: 4000, max: 11000, xpMin: 75, xpMax: 150, hpMin: 30, hpMax: 60, enerMin: 1, enerMax: 4, marineChance: 15, marineFue: [100,105,110,80,95,200], marineBo: 100000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 6, min: 4500, max: 12500, xpMin: 90, xpMax: 180, hpMin: 40, hpMax: 80, enerMin: 1, enerMax: 4, marineChance: 15, marineFue: [120,125,130,100,115,220], marineBo: 110000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 7, min: 5000, max: 14000, xpMin: 105, xpMax: 210, hpMin: 50, hpMax: 100, enerMin: 1, enerMax: 4, marineChance: 15, marineFue: [140,145,150,120,135,240], marineBo: 130000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 8, min: 5500, max: 15500, xpMin: 120, xpMax: 240, hpMin: 60, hpMax: 120, enerMin: 1, enerMax: 4, marineChance: 18, marineFue: [200,215,250,220,235,340], marineBo: 150000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 9, min: 6000, max: 17000, xpMin: 135, xpMax: 270, hpMin: 75, hpMax: 150, enerMin: 1, enerMax: 4, marineChance: 18, marineFue: [250,265,300,270,285,390], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 10, min: 6500, max: 18500, xpMin: 150, xpMax: 300, hpMin: 100, hpMax: 200, enerMin: 1, enerMax: 4, marineChance: 18, marineFue: [300,315,350,220,335,440], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 11, min: 7000, max: 20000, xpMin: 165, xpMax: 330, hpMin: 125, hpMax: 250, enerMin: 1, enerMax: 4, marineChance: 20, marineFue: [400,415,450,320,435,540], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 12, min: 7500, max: 21500, xpMin: 180, xpMax: 360, hpMin: 150, hpMax: 300, enerMin: 1, enerMax: 4, marineChance: 20, marineFue: [500,515,550,420,535,640], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 13, min: 8000, max: 23000, xpMin: 200, xpMax: 400, hpMin: 180, hpMax: 350, enerMin: 1, enerMax: 4, marineChance: 22, marineFue: [600,615,650,520,635,740], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 14, min: 8500, max: 24500, xpMin: 220, xpMax: 440, hpMin: 200, hpMax: 400, enerMin: 1, enerMax: 4, marineChance: 22, marineFue: [600,615,650,520,635,740], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 15, min: 9000, max: 26000, xpMin: 240, xpMax: 480, hpMin: 250, hpMax: 450, enerMin: 1, enerMax: 4, marineChance: 25, marineFue: [600,615,650,520,635,740], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 16, min: 9500, max: 27500, xpMin: 260, xpMax: 520, hpMin: 300, hpMax: 500, enerMin: 1, enerMax: 4, marineChance: 25, marineFue: [600,615,650,520,635,740], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 17, min: 10000, max: 29000, xpMin: 280, xpMax: 560, hpMin: 350, hpMax: 550, enerMin: 1, enerMax: 4, marineChance: 28, marineFue: [750,765,800,680,785,890], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 18, min: 11000, max: 31000, xpMin: 350, xpMax: 700, hpMin: 400, hpMax: 600, enerMin: 1, enerMax: 4, marineChance: 28, marineFue: [850,865,900,780,885,1000], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 19, min: 12000, max: 33000, xpMin: 420, xpMax: 840, hpMin: 500, hpMax: 700, enerMin: 1, enerMax: 4, marineChance: 30, marineFue: [750,765,800,680,785,890], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { id: 20, min: 13000, max: 35000, xpMin: 500, xpMax: 1000, hpMin: 600, hpMax: 1210, enerMin: 1, enerMax: 4, marineChance: 30, marineFue: [350,465,500,680,785,800], marineBo: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
];

module.exports = {
  name: "explorar",
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
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, Has derrotado a la marina.\n y ganaste ${xpGain} XP`).setColor("GREEN"));
      }
      const pp = [1, 2, 3, 1];
      const ppr = pp[Math.floor(Math.random() * pp.length)];
      if (ppr === 3) {
        profile.progress.xp += x;
        profile.progress.bounty += bo;
        await profile.save();
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, Has derrotado a la marina.\n y has ganado ${x} XP`).setColor("GREEN"));
      }
      if (ppr === 2) {
        await Prison.findOneAndUpdate({ id: author.id }, { atrapado: 1, nivel: 1, fuerza: fer }, { upsert: true });
        return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, La marina te ha derrotado, y te ha llevado a una carcel nivel I`).setColor("RED"));
      }
      return sendMsg(null, new EmbedBuilder().setDescription(`${profile.name}, La marina te ha derrotado, pero te has logrado escapar.`).setColor("ORANGE"));
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
        .setColor("GREEN");
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
      .setColor("GREEN")
      .setFooter({ text: isWeekend ? "Recompensa De Finde x2" : "" });
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
