const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "duel",
  alias: [],
  description: "Desafía a otro jugador a un duelo",
  options: [
    { name: "usuario", description: "Usuario a desafiar", type: 6, required: true },
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
      const reply = "¡No especificó con quién le gustaría hacer el duelo!";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetUser.id === author.id) {
      const reply = "¡no puedes hacer duelo contra ti mismo!";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (targetUser.bot) {
      const reply = "¡No puedes hacer duelo contra un bot!";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const challengerProfile = await Profile.findOne({ id: author.id });
    if (!challengerProfile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const opponentProfile = await Profile.findOne({ id: targetUser.id });
    if (!opponentProfile) {
      const reply = "Ese usuario no tiene un perfil...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const acceptRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("duel_accept").setLabel("✅ Aceptar").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("duel_decline").setLabel("❌ Rechazar").setStyle(ButtonStyle.Danger),
    );

    const challengeMsg = isSlash
      ? await messageOrInteraction.editReply({ content: `<@${targetUser.id}>, <@${author.id}> te ha desafiado a duelo. ¿Aceptas?`, components: [acceptRow], fetchReply: true })
      : await messageOrInteraction.channel.send({ content: `<@${targetUser.id}>, <@${author.id}> te ha desafiado a duelo. ¿Aceptas?`, components: [acceptRow] });

    const filter = (i) => i.user.id === targetUser.id;
    try {
      const interaction = await challengeMsg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 30000 });
      if (interaction.customId === "duel_decline") {
        await interaction.update({ content: `❌ <@${targetUser.id}> rechazó el duelo.`, components: [] });
        return;
      }
      await interaction.update({ content: `✅ <@${targetUser.id}> ha aceptado el duelo.`, components: [] });
    } catch {
      const reply = "El duelo expiró...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply, components: [] });
      return messageOrInteraction.channel.send({ content: reply, components: [] });
    }

    await startDuel(challengerProfile, opponentProfile, author, targetUser, messageOrInteraction.channel);
  },
};

async function startDuel(p1, p2, user1, user2, channel) {
  const players = [
    { profile: p1, user: user1, hp: p1.stats.health.current, maxHp: p1.stats.health.max },
    { profile: p2, user: user2, hp: p2.stats.health.current, maxHp: p2.stats.health.max },
  ];

  let turn = Math.random() < 0.5 ? 0 : 1;
  let shield = 0;

  const actionRow = () => new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("duel_atk").setLabel("⚔️ Atacar").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("duel_def").setLabel("🛡️ Defender").setStyle(ButtonStyle.Primary),
  );

  async function nextTurn() {
    const current = players[turn];
    if (current.hp <= 0) {
      const winner = players[1 - turn];
      channel.send(`**${winner.profile.name}** ha ganado este duelo. 🎉`);
      const xpGain = Math.floor(Math.random() * 30) + 20;
      winner.profile.progress.xp += xpGain;
      await winner.profile.save();
      return;
    }

    const msg = await channel.send({
      content: `**${current.profile.name}**, es tu turno\n❤️ ${Math.max(0, current.hp)}/${current.maxHp}\n\nElige tu acción:`,
      components: [actionRow()],
    });

    try {
      const i = await msg.awaitMessageComponent({
        filter: (btn) => btn.user.id === current.user.id,
        componentType: ComponentType.Button,
        time: 30000,
      });

      if (i.customId === "duel_atk") {
        const attacker = players[turn];
        const defender = players[1 - turn];
        const atkRoll = Math.floor(Math.random() * attacker.profile.stats.atk) + 1;
        let dmg = atkRoll;

        if (shield > 0) {
          if (atkRoll > shield) {
            dmg = atkRoll - shield;
            await channel.send(`**${attacker.profile.name}** rompió el escudo de **${defender.profile.name}** y causó ${dmg} de daño`);
          } else {
            await channel.send(`**${attacker.profile.name}** atacó pero **${defender.profile.name}** bloqueó todo`);
            shield = 0;
            turn = 1 - turn;
            await i.update({ components: [] });
            return nextTurn();
          }
          shield = 0;
        } else {
          await channel.send(`**${attacker.profile.name}** atacó a **${defender.profile.name}** y causó ${dmg} de daño`);
        }

        defender.hp -= dmg;
        if (defender.hp <= 0) {
          await channel.send(`**${attacker.profile.name}** ha dejado inconsciente a **${defender.profile.name}**... 🎉 **${attacker.profile.name}** ha ganado. 🎉`);
          const xpGain = Math.floor(Math.random() * 30) + 20;
          attacker.profile.progress.xp += xpGain;
          await attacker.profile.save();
          await i.update({ components: [] });
          return;
        }

        turn = 1 - turn;
        await i.update({ components: [] });
        nextTurn();
      }

      if (i.customId === "duel_def") {
        shield = Math.floor(Math.random() * current.profile.stats.def) + 1;
        await channel.send(`**${current.profile.name}** generó un escudo de ${shield}`);
        turn = 1 - turn;
        await i.update({ components: [] });
        nextTurn();
      }
    } catch {
      await msg.edit({ content: `${current.profile.name} no respondió a tiempo. Duelo cancelado.`, components: [] });
    }
  }

  nextTurn();
}
