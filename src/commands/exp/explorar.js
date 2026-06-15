const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Cooldown = require("../../models/Cooldown");
const Prison = require("../../models/Prison");

const AREAS = [
  { min: 1, max: 1, berriMin: 2000, berriMax: 3000, xpMin: 15, xpMax: 30, dmgMin: 5, dmgMax: 15, energyMin: 1, energyMax: 3, marineChance: 8, marineAtk: [20,25,30,10,15,40], marineBounty: 50000, marineXp: 100, places: ["Un Bosque","Una Selva","Una Caberna","Un Castillo","Un Barco","Una Casa Embrujada"] },
  { min: 2, max: 2, berriMin: 2500, berriMax: 4000, xpMin: 30, xpMax: 60, dmgMin: 20, dmgMax: 30, energyMin: 2, energyMax: 4, marineChance: 8, marineAtk: [40,45,40,20,35,60], marineBounty: 60000, marineXp: 153, places: ["Un Cementerio","Un Lago","Un Bunque","Una Playa","Un Palacio","Una Montaña"] },
  { min: 3, max: 3, berriMin: 3000, berriMax: 5000, xpMin: 45, xpMax: 90, dmgMin: 50, dmgMax: 65, energyMin: 1, energyMax: 4, marineChance: 15, marineAtk: [60,65,70,40,55,120], marineBounty: 80000, marineXp: 100, places: ["Unas Ruinas","Una Iglesia","Una Cascada","Una Piramide","Una Cueva","Un Arbol"] },
];

module.exports = {
  name: "explorar",
  alias: ["explore"],
  description: "Explora las islas en busca de tesoros",
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
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const now = Date.now();
    if (cd.explore && now - cd.explore < 60000) {
      const remaining = 60000 - (now - cd.explore);
      const s = Math.ceil(remaining / 1000);
      const reply = `Espera ${s}s para explorar de nuevo.`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const area = AREAS[profile.area.areas - 1] || AREAS[0];
    const place = area.places[Math.floor(Math.random() * area.places.length)];
    const roll = Math.floor(Math.random() * 100) + 1;

    let description = `Has explorado **${place}**`;

    if (roll <= 10) {
      const isla = Math.floor(Math.random() * 3) + 1;
      if (isla <= profile.area.maxarea) {
        profile.area.areas = isla;
        description += `\n\n🌴 ¡Has encontrado una nueva isla! Ahora puedes explorar el área **${isla}**`;
      }
    } else if (roll <= 20) {
      const chestBerri = Math.floor(Math.random() * 5000) + 1000;
      profile.bank.cash += chestBerri;
      description += `\n\n🎁 ¡Has encontrado un cofre! +${chestBerri.toLocaleString()} <:berri:907114454108491806>`;
    } else if (roll <= 30) {
      const xpGain = Math.floor(Math.random() * 30) + 10;
      profile.progress.xp += xpGain;
      const maxXp = profile.progress.level * 180;
      description += `\n\n⚔️ ¡Has derrotado a un enemigo! +${xpGain} XP`;
      if (profile.progress.xp >= maxXp) {
        profile.progress.level += 1;
        profile.progress.xp -= maxXp;
        description += `\n\n🎉 **¡Has subido al nivel ${profile.progress.level}!**`;
      }
    } else if (roll <= 35) {
      const atk = area.marineAtk;
      const chosen = atk[Math.floor(Math.random() * atk.length)];
      const pirateStrength = profile.progress.level * 10 + (profile.stats.fuerza || 0);
      if (pirateStrength >= chosen) {
        profile.bank.cash += area.marineBounty;
        profile.progress.xp += area.marineXp;
        description += `\n\n⚓ ¡Has derrotado a la marina! +${area.marineBounty.toLocaleString()} <:berri:907114454108491806> y +${area.marineXp} XP`;
      } else {
        const marineRoll = Math.floor(Math.random() * 3) + 1;
        if (marineRoll === 2) {
          await Prison.findOneAndUpdate({ id: author.id }, { atrapado: 1, nivel: 1 }, { upsert: true });
          description += `\n\n⛓️ La marina te ha derrotado, y te ha llevado a una carcel nivel I`;
        } else {
          const escapeBerri = Math.floor(Math.random() * 2000) + 500;
          profile.bank.cash = Math.max(0, profile.bank.cash - escapeBerri);
          description += `\n\n🏃‍♂️ La marina te ha derrotado pero lograste escapar, perdiendo ${escapeBerri.toLocaleString()} <:berri:907114454108491806>`;
        }
      }
    } else {
      const berriGain = Math.floor(Math.random() * (area.berriMax - area.berriMin + 1)) + area.berriMin;
      const xpGain = Math.floor(Math.random() * (area.xpMax - area.xpMin + 1)) + area.xpMin;
      profile.bank.cash += berriGain;
      profile.progress.xp += xpGain;
      description += `\n\n🦜 Has encontrado **${berriGain.toLocaleString()}** <:berri:907114454108491806> y **${xpGain} XP**`;
    }

    cd.explore = now;
    await profile.save();
    await cd.save();

    const embed = new EmbedBuilder()
      .setTitle(`🌊 Exploración - ${profile.name}`)
      .setDescription(description)
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
