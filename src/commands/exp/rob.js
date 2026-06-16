const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "rob",
  alias: ["robar"],
  description: "Intenta robarle berries a otro jugador",
  options: [
    { name: "usuario", description: "Usuario a robar", type: 6, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let targetUser;
    if (isSlash) {
      targetUser = messageOrInteraction.options.getUser("usuario");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      targetUser = messageOrInteraction.mentions?.users?.first();
    }

    if (!targetUser) {
      const reply = "Menciona a la persona que quieres robar";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetUser.id === author.id) {
      const reply = "No te puedes robar a ti mismo....";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const thief = await Profile.findOne({ id: author.id });
    if (!thief) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const victim = await Profile.findOne({ id: targetUser.id });
    if (!victim) {
      const reply = "El usuario que mencionaste no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const victimCash = victim.bank.cash;
    if (victimCash <= 0) {
      const reply = `mm que lastima **${thief.name}**, parece que **${victim.name}** no trae dinero consigo`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const atkThief = thief.stats.atk;
    const atkVictim = victim.stats.atk;

    const probability = Math.min((atkThief / Math.max(atkVictim, 1)) * 50, 90);
    const roll = Math.floor(Math.random() * 100) + 1;

    if (!isFinite(probability)) {
      const reply = `**${thief.name}** hubo un error intentelo de nuevo...`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (roll < 10) {
      const penalty = Math.floor(victimCash / 2);
      const dmg = Math.floor(Math.random() * atkVictim) + 1;

      thief.bank.cash = Math.max(0, thief.bank.cash - penalty);
      victim.bank.cash += penalty;
      thief.stats.health.current = Math.max(0, thief.stats.health.current - dmg);
      await thief.save();
      await victim.save();

      const reply = `**${thief.name}**, le intentó robar a **${victim.name}** pero falló\n**${victim.name}** se dio cuenta y le sacó **${dmg}** ❤️ de vida y <:berri:907114454108491806>**${penalty.toLocaleString("en-US")}** berries`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (roll > 90) {
      thief.bank.cash += victimCash;
      victim.bank.cash = 0;
      await thief.save();
      await victim.save();

      const reply = `**${thief.name}**, le ha robado <:berri:907114454108491806>**${victimCash.toLocaleString("en-US")}** Berries a **${victim.name}**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const stolenPct = roll / 100;
    const stolen = Math.round(victimCash * stolenPct);

    thief.bank.cash += stolen;
    victim.bank.cash -= stolen;
    await thief.save();
    await victim.save();

    const reply = `**${thief.name}** le ha robado <:berri:907114454108491806>**${stolen.toLocaleString("en-US")}** a **${victim.name}**`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
