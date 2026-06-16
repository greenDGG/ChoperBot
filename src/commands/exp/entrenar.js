const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Training = require("../../models/Training");
const Cooldown = require("../../models/Cooldown");

const COOLDOWN_TRAIN = 43200000;

module.exports = {
  name: "entrenar",
  alias: ["ent", "train"],
  description: "Entrena para ganar puntos de entrenamiento",
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

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const now = Date.now();
    if (cd.train && now - cd.train < COOLDOWN_TRAIN) {
      const remaining = COOLDOWN_TRAIN - (now - cd.train);
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      const reply = `Ya Has Entrenado, Espera Unas **${h}h ${m}m ${s}s...**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (profile.stats.energy.current < 5) {
      const reply = "No tienes suficiente energía para entrenar.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let training = await Training.findOne({ id: author.id });
    if (!training) training = await Training.create({ id: author.id, points: 0 });

    const puntos = Math.floor(Math.random() * 2) + 1;
    const energia = Math.floor(Math.random() * 5) + 5;

    profile.stats.energy.current = Math.max(0, profile.stats.energy.current - energia);
    await profile.save();

    training.points += puntos;
    await training.save();

    cd.train = now;
    await cd.save();

    const embed = new EmbedBuilder()
      .setDescription(`**${profile.name}** A Entrenado.\nGanó <:puntosop:911040434510397510>**${puntos}** ${puntos === 1 ? "punto" : "puntos"} ∅P\nGastó ⚡${energia} de Energia`)
      .setColor("Green");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
