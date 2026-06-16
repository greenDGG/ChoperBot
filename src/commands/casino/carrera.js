const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

const HORSES = [
  { name: "Tormenta", emoji: "🐎", speed: 4 },
  { name: "Relámpago", emoji: "🏇", speed: 3 },
  { name: "Sombra", emoji: "🐴", speed: 5 },
  { name: "Centella", emoji: "🐏", speed: 4 },
  { name: "Furia", emoji: "🐆", speed: 6 },
  { name: "Brisa", emoji: "🦄", speed: 2 },
];

const TRACK_LENGTH = 55;

module.exports = {
  name: "carrera",
  alias: ["horses", "caballos"],
  description: "Apuesta a un caballo en una carrera",
  options: [
    { name: "apuesta", description: "Cantidad a apostar", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    if (isSlash && !messageOrInteraction.deferred) await messageOrInteraction.deferReply();

    let bet;
    if (isSlash) bet = messageOrInteraction.options.getInteger("apuesta");
    else {
      const a = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      a.shift(); bet = parseInt(a[0]);
    }

    if (!bet || isNaN(bet) || bet < 100) {
      const r = "Apuesta mínima: **100** berries";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const r = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }
    if (bet > profile.bank.cash) {
      const r = "No tienes suficiente dinero.";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }

    profile.bank.cash -= bet;
    await profile.save();

    const row = new ActionRowBuilder();
    const ids = [];
    for (const h of HORSES) {
      const id = `horse_${h.speed}_${h.name.slice(0, 4)}`;
      ids.push(id);
      row.addComponents(new ButtonBuilder().setCustomId(id).setLabel(`${h.emoji} ${h.name}`).setStyle(ButtonStyle.Secondary));
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — Carrera de Caballos`, iconURL: author.displayAvatarURL() })
      .setDescription("Elige tu caballo:")
      .setColor("Blue");

    const msg = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [row], fetchReply: true })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [row] });

    try {
      const i = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });

      const chosenId = i.customId;
      const chosenHorse = HORSES.find(h => {
        const id = `horse_${h.speed}_${h.name.slice(0, 4)}`;
        return id === chosenId;
      });

      const finishMsg = await i.update({
        content: "🏁 **La carrera ha comenzado!** 🏁",
        embeds: [raceEmbed(null, null, true)],
        components: [],
        fetchReply: true,
      });

      const positions = HORSES.map(() => 0);
      const winnerIndex = await runRace(finishMsg, positions);

      const won = HORSES[winnerIndex].name === chosenHorse.name;
      if (won) {
        const win = Math.floor(bet * 3);
        profile.bank.cash += bet + win;
        await profile.save();
        const finalEmbed = raceEmbed(winnerIndex, positions, false);
        finalEmbed.setDescription(`**${HORSES[winnerIndex].emoji} ${HORSES[winnerIndex].name}** ha ganado! 🏆\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** (×3) 🎉`);
        finalEmbed.setColor("Gold");
        await finishMsg.edit({ embeds: [finalEmbed] });
      } else {
        const finalEmbed = raceEmbed(winnerIndex, positions, false);
        finalEmbed.setDescription(`**${HORSES[winnerIndex].emoji} ${HORSES[winnerIndex].name}** ha ganado! 🏆\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`);
        finalEmbed.setColor("Red");
        await finishMsg.edit({ embeds: [finalEmbed] });
      }
    } catch {
      profile.bank.cash += bet;
      await profile.save();
      await msg.edit({ components: [] });
    }
  },
};

function raceEmbed(winnerIdx, positions, isStart) {
  const desc = isStart
    ? HORSES.map((h, i) => `${h.emoji} **${h.name}**`).join("\n")
    : HORSES.map((h, i) => {
        const p = Math.min(Math.floor((positions[i] || 0) / TRACK_LENGTH * 20), 20);
        const track = "─".repeat(p) + (i === winnerIdx ? "🏇" : h.emoji) + "─".repeat(Math.max(0, 20 - p));
        return track;
      }).join("\n");

  return new EmbedBuilder()
    .setTitle(isStart ? "🏁 Parrilla de Salida" : "🏁 Carrera")
    .setDescription(desc)
    .setColor(isStart ? "Blue" : "Gold");
}

async function runRace(msg, positions) {
  const finished = new Set();

  for (let round = 0; round < 30 && finished.size < HORSES.length; round++) {
    for (let i = 0; i < HORSES.length; i++) {
      if (finished.has(i)) continue;
      const step = Math.floor(Math.random() * HORSES[i].speed) + 1;
      positions[i] += step;
      if (positions[i] >= TRACK_LENGTH) finished.add(i);
    }

    if (finished.size > 0) {
      const first = [...finished].sort((a, b) => positions[b] - positions[a])[0];
      const e = raceEmbed(first, positions, false);
      e.setDescription(`**En carrera...**\n\n${HORSES.map((h, i) => {
        const p = Math.min(Math.floor((positions[i] || 0) / TRACK_LENGTH * 20), 20);
        const track = "─".repeat(p) + (i === first ? "🏇" : h.emoji) + "─".repeat(Math.max(0, 20 - p));
        return track;
      }).join("\n")}`);
      e.setColor("Gold");
      await msg.edit({ embeds: [e] });
      await delay(1500);
    }
  }

  let winnerIdx = 0;
  let maxPos = -1;
  for (let i = 0; i < HORSES.length; i++) {
    if (positions[i] > maxPos) {
      maxPos = positions[i];
      winnerIdx = i;
    }
  }
  return winnerIdx;
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
