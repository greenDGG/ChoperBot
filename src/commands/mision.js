const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Mission = require("../models/Mission");
const misionsData = require("../../data/misions.json");

const MAX_ACTIVE = 3;
const COOLDOWN_MS = 3600000;

module.exports = {
  name: "mision",
  alias: [],
  description: "Gestiona tus misiones",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let missionDoc = await Mission.findOne({ id: author.id });
    if (!missionDoc) {
      missionDoc = await Mission.create({ id: author.id, activeMissions: [], cooldownUntil: 0 });
    }

    const now = Date.now();
    const inCooldown = missionDoc.cooldownUntil > now;

    const active = missionDoc.activeMissions.filter((m) => !m.completed);
    const completed = missionDoc.activeMissions.filter((m) => m.completed);

    if (active.length > 0) {
      const embed = new EmbedBuilder()
        .setTitle("Progreso de Misiones")
        .setColor("Green");
      for (const m of active) {
        const data = misionsData.find((d) => d.id === m.missionId);
        embed.addFields({
          name: data ? data.description : `Misión #${m.missionId}`,
          value: `Progreso: ${m.progress}/${m.target}`,
          inline: false,
        });
      }
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    if (completed.length > 0 && active.length === 0) {
      for (const m of completed) {
        const data = misionsData.find((d) => d.id === m.missionId);
        if (data) {
          profile.bank.cash += data.rewardCash;
          profile.progress.xp += data.rewardXp;
        }
      }
      await profile.save();
      missionDoc.activeMissions = [];
      missionDoc.cooldownUntil = now + COOLDOWN_MS;
      await missionDoc.save();

      const embed = new EmbedBuilder()
        .setTitle("Misiones Completadas")
        .setDescription(`Recompensas entregadas.\nEspera **1 hora** antes de aceptar nuevas misiones.`)
        .setColor("Green");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    if (inCooldown) {
      const remaining = missionDoc.cooldownUntil - now;
      const min = Math.floor(remaining / 60000);
      const sec = Math.floor((remaining % 60000) / 1000);
      const reply = `Ya Has Hecho Una Mision, Espera Unas **${min}m ${sec}s...**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (missionDoc.activeMissions.length >= MAX_ACTIVE) {
      const reply = "Ya tienes 3 misiones activas. Complétalas primero.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const areaMissions = misionsData.filter((m) => m.area <= profile.area.areas);
    if (areaMissions.length === 0) {
      const reply = "No hay misiones disponibles para tu área.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const randomMission = areaMissions[Math.floor(Math.random() * areaMissions.length)];
    const embed = new EmbedBuilder()
      .setTitle(`Mision Area #${randomMission.area}`)
      .setDescription(`${randomMission.description}\nRecompensa De Mision\n**<:berri:907114454108491806> ${randomMission.rewardCash.toLocaleString("en-US")} Berris y ${randomMission.rewardXp}XP**\n¿Deseas aceptar? \`si|no\``)
      .setColor("Green");

    if (isSlash) {
      const replyContent = `${randomMission.description}\nRecompensa: <:berri:907114454108491806>${randomMission.rewardCash.toLocaleString("en-US")} Berris y ${randomMission.rewardXp}XP\nResponde con \`si\` o \`no\``;
      await messageOrInteraction.editReply({ content: replyContent });
      const filter = (m) => m.author.id === author.id;
      const collector = messageOrInteraction.channel.createMessageCollector({ filter, time: 30000, max: 1 });
      collector.on("collect", async (msg) => {
        const content = msg.content.toLowerCase();
        if (content === "si") {
          missionDoc.activeMissions.push({
            missionId: randomMission.id,
            progress: 0,
            target: randomMission.target,
            completed: false,
          });
          await missionDoc.save();
          msg.channel.send(`**${profile.name}**, Tiene una Nueva Mision.`);
        } else {
          msg.channel.send(`:)`);
        }
        collector.stop();
      });
    } else {
      const sent = await messageOrInteraction.channel.send({ embeds: [embed] });
      const filter = (m) => m.author.id === author.id;
      const collector = messageOrInteraction.channel.createMessageCollector({ filter, time: 30000, max: 1 });
      collector.on("collect", async (msg) => {
        if (msg.content.toLowerCase() === "si") {
          missionDoc.activeMissions.push({
            missionId: randomMission.id,
            progress: 0,
            target: randomMission.target,
            completed: false,
          });
          await missionDoc.save();
          msg.channel.send(`**${profile.name}**, Tiene una Nueva Mision.`);
        } else {
          msg.channel.send(`:)`);
        }
        collector.stop();
      });
    }
  },
};
