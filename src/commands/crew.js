const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Profile = require("../models/Profile");
const Crew = require("../models/Crew");

module.exports = {
  name: "crew",
  alias: [],
  description: "Gestiona tu tripulación",
  options: [
    {
      name: "info",
      description: "Ver información de tu tripulación",
      type: 1,
    },
    {
      name: "crear",
      description: "Crea una tripulación",
      type: 1,
      options: [
        { name: "nombre", description: "Nombre de la tripulación", type: 3, required: true },
      ],
    },
    {
      name: "invitar",
      description: "Invita a un usuario a tu tripulación",
      type: 1,
      options: [
        { name: "usuario", description: "Usuario a invitar", type: 6, required: true },
      ],
    },
    {
      name: "lista",
      description: "Lista de miembros de tu tripulación",
      type: 1,
    },
    {
      name: "kick",
      description: "Expulsa a un miembro (solo líder)",
      type: 1,
      options: [
        { name: "usuario", description: "Usuario a expulsar", type: 6, required: true },
      ],
    },
    {
      name: "salir",
      description: "Abandona la tripulación",
      type: 1,
    },
    {
      name: "eliminar",
      description: "Elimina la tripulación (solo líder)",
      type: 1,
    },
  ],
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

    let subcommand;
    let args = [];
    if (isSlash) {
      subcommand = messageOrInteraction.options.getSubcommand();
    } else {
      args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      subcommand = args[0] === "crew" ? (args[1] || "info") : args[0];
    }

    if (subcommand === "crear") {
      let nombre;
      if (isSlash) {
        nombre = messageOrInteraction.options.getString("nombre");
      } else {
        nombre = args.slice(2).join(" ");
      }

      if (profile.crewId) {
        const reply = "Ya Estas En Una Tripulación";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (profile.equipped.ship === 0) {
        const reply = "Necesitas Tener Un Barco Para Crear Una Tripulación.";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (!nombre) {
        const reply = "No Has Puesto Un Nombre Para La Tripulación...";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const crewId = Math.random().toString(36).slice(2, 11);
      await Crew.create({
        id: crewId,
        name: nombre,
        ownerId: author.id,
        players: [profile._id],
      });
      profile.crewId = crewId;
      await profile.save();

      const embed = new EmbedBuilder()
        .setDescription(`Tripulación **${nombre}** A Sido Creada Con Exito.`)
        .setColor("Green");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    if (subcommand === "ranking") {
      const allCrews = await Crew.find().sort({ level: -1, xp: -1 }).limit(10).lean();
      let final = "";
      for (let i = 0; i < allCrews.length; i++) {
        const c = allCrews[i];
        const path = ["🥇", "🥈", "🥉", "4", "5", "6", "7", "8", "9", "10"][i] || `${i + 1}`;
        const memberCount = await Profile.countDocuments({ crewId: c.id });
        final += `${path}. **${memberCount}** Nakamas -- ${c.name}\n`;
      }
      const embed = new EmbedBuilder()
        .setTitle("Ranking Global (Nakamas)")
        .setDescription(final || "No hay tripulaciones aún")
        .setColor("Green");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    if (!profile.crewId) {
      const reply = "No tienes una tripulación\nCrea uno con `op!crew crear [nombre]` o recibe una invitación de un líder de tripulación";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const crew = await Crew.findOne({ id: profile.crewId });
    if (!crew) {
      profile.crewId = "";
      await profile.save();
      const reply = "Tu tripulación ya no existe...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (subcommand === "invitar") {
      let targetUser;
      if (isSlash) {
        targetUser = messageOrInteraction.options.getUser("usuario");
      } else {
        targetUser = messageOrInteraction.mentions.users.first();
      }

      if (!targetUser) {
        const reply = "Menciona a alguien";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (targetUser.id === author.id) {
        const reply = "No seas pendejo y no te invites a ti mismo ._.";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const targetProfile = await Profile.findOne({ id: targetUser.id });
      if (!targetProfile) {
        const reply = "Este Usuario No Tiene Un Perfil Creado.";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (targetProfile.crewId) {
        const reply = "Este Usuario Ya Tiene Una Tripulación";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const ch = isSlash ? null : messageOrInteraction.channel;
      const sentMsg = await messageOrInteraction[
        isSlash ? (messageOrInteraction.deferred ? "editReply" : "reply") : "channel"
      ](
        isSlash
          ? { content: `<@${targetUser.id}>, ${author} Te Ha Invitado A Su Tripulación\n**Si:** Para Aceptar\n**No:** Para Rechazar`, fetchReply: true }
          : { content: `<@${targetUser.id}>, ${author} Te Ha Invitado A Su Tripulación\n**Si:** Para Aceptar\n**No:** Para Rechazar` }
      );

      const filter = (m) => m.author.id === targetUser.id;
      const collector = (ch || messageOrInteraction.channel).createMessageCollector({ filter, time: 60000, max: 1 });
      collector.on("collect", async (msg) => {
        const content = msg.content.toLowerCase();
        if (content === "si") {
          targetProfile.crewId = crew.id;
          crew.players.push(targetProfile._id);
          await targetProfile.save();
          await crew.save();
          msg.channel.send(`${author}, <@${targetUser.id}> Ha Aceptado Su Invitación.`);
        } else if (content === "no") {
          msg.channel.send(`${author}, <@${targetUser.id}> No Se Quiere Unir A Tu Tripulación.`);
        }
        collector.stop();
      });
      collector.on("end", (collected) => {
        if (collected.size === 0) {
          const ch2 = ch || messageOrInteraction.channel;
          ch2.send("Tiempo de espera agotado.");
        }
      });
      return;
    }

    if (subcommand === "kick") {
      let targetUser;
      if (isSlash) {
        targetUser = messageOrInteraction.options.getUser("usuario");
      } else {
        targetUser = messageOrInteraction.mentions.users.first();
      }

      if (crew.ownerId !== author.id) {
        const reply = "Solo El Owner Puede Expulsar Del Crew";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (!targetUser) {
        const reply = "Debes @mencionar a la persona que quieres sacar...";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (targetUser.id === author.id) {
        const reply = "no puedes expulsarte a ti mismo!!";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const targetProfile = await Profile.findOne({ id: targetUser.id });
      if (targetProfile && targetProfile.crewId === crew.id) {
        targetProfile.crewId = "";
        await targetProfile.save();
        crew.players.pull(targetProfile._id);
        await crew.save();
      }

      const reply = `**${profile.name}**, ha expulsado a **${targetProfile?.name || targetUser.username}** de **${crew.name}**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (subcommand === "salir") {
      if (author.id === crew.ownerId) {
        const reply = "no puedes dejar tu propia tripulacion!!";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const ch = isSlash ? null : messageOrInteraction.channel;
      const sentMsg = isSlash
        ? await messageOrInteraction.editReply({ content: `**${profile.name}** Estas Seguro Que Quieres Abandonar A Tus Nakamas? \`Si/No\``, fetchReply: true })
        : await messageOrInteraction.channel.send(`**${profile.name}** Estas Seguro Que Quieres Abandonar A Tus Nakamas? \`Si/No\``);

      const filter = (m) => m.author.id === author.id;
      const collector = (ch || messageOrInteraction.channel).createMessageCollector({ filter, time: 60000, max: 1 });
      collector.on("collect", async (msg) => {
        if (msg.content.toLowerCase() === "si") {
          profile.crewId = "";
          await profile.save();
          crew.players.pull(profile._id);
          await crew.save();
          msg.channel.send(`Que mal, **${profile.name}** ha abandonado **${crew.name}**.`);
        } else {
          msg.channel.send(`:)`);
        }
        collector.stop();
      });
      return;
    }

    if (subcommand === "eliminar") {
      if (author.id !== crew.ownerId) {
        const reply = "Solo El Owner Puede Eliminar El Crew";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      const ch = isSlash ? null : messageOrInteraction.channel;
      const sentMsg = isSlash
        ? await messageOrInteraction.editReply({ content: `**${profile.name}**, ¿Estás seguro de que quieres eliminar a tu Tripulacion? \`si/no\``, fetchReply: true })
        : await messageOrInteraction.channel.send(`**${profile.name}**, ¿Estás seguro de que quieres eliminar a tu Tripulacion? \`si/no\``);

      const filter = (m) => m.author.id === author.id;
      const collector = (ch || messageOrInteraction.channel).createMessageCollector({ filter, time: 60000, max: 1 });
      collector.on("collect", async (msg) => {
        if (msg.content.toLowerCase() === "si") {
          await Profile.updateMany({ crewId: crew.id }, { crewId: "" });
          await Crew.deleteOne({ id: crew.id });
          msg.channel.send(`**${crew.name}**, Ha sido eliminado con exito.`);
        } else {
          msg.channel.send(`:)`);
        }
        collector.stop();
      });
      return;
    }

    const memberProfiles = await Profile.find({ crewId: crew.id }).lean();
    const memberCount = memberProfiles.length;
    const totalAtk = memberProfiles.reduce((s, p) => s + (p.stats?.atk || 0), 0);
    const totalDef = memberProfiles.reduce((s, p) => s + (p.stats?.def || 0), 0);
    const totalPower = totalAtk + totalDef;
    const xpPercent = crew.xp && crew.level ? Math.round((crew.xp / (crew.level * 300)) * 100) : 0;

    const embed = new EmbedBuilder()
      .setTitle(crew.name)
      .addFields(
        {
          name: `Progreso (${xpPercent}%)`,
          value: `**Nivel**: ${crew.level}\n**XP**: ${crew.xp.toLocaleString("en-US")}/${(crew.level * 300).toLocaleString("en-US")}\n**Jugadores**: ${memberCount}/${crew.maxPlayers}`,
          inline: true,
        },
        {
          name: "Estadisticas",
          value: `**Poder**: ${totalPower.toLocaleString("en-US")}\n**Dinero**: <:berri:907114454108491806>${crew.cash.toLocaleString("en-US")} Berries`,
          inline: true,
        },
        {
          name: "Crew Comandos",
          value: "`eliminar`, `invitar`, `kick`,\n`salir`, `lista`, `ranking`\n\nEjemplo: `op!crew lista`",
        }
      )
      .setColor("Green");
    if (crew.flag?.url) embed.setThumbnail(crew.flag.url);
    embed.setFooter({ text: `ID: ${crew.id}` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("crew_info").setLabel("Info").setStyle(ButtonStyle.Primary).setDisabled(true),
      new ButtonBuilder().setCustomId("crew_lista").setLabel("Lista").setStyle(ButtonStyle.Secondary),
    );

    if (isSlash) {
      const msg = await messageOrInteraction.editReply({ embeds: [embed], components: [row], fetchReply: true });
      const collector = msg.createMessageComponentCollector({ filter: (i) => i.user.id === author.id, time: 120000 });
      collector.on("collect", async (i) => {
        if (i.customId === "crew_lista") {
          const memberNames = memberProfiles.map((p) => p.name);
          const listaEmbed = new EmbedBuilder()
            .setTitle(`${crew.name} Nakamas`)
            .setDescription(memberNames.length ? memberNames.map((n, idx) => `${idx + 1}. ${n}`).join("\n") : "Sin miembros")
            .setColor("Green");
          const backRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("crew_back").setLabel("Volver").setStyle(ButtonStyle.Secondary),
          );
          await i.update({ embeds: [listaEmbed], components: [backRow] });
        } else if (i.customId === "crew_back") {
          await i.update({ embeds: [embed], components: [row] });
        }
      });
    } else {
      const msg = await messageOrInteraction.channel.send({ embeds: [embed], components: [row] });
      const collector = msg.createMessageComponentCollector({ filter: (i) => i.user.id === author.id, time: 120000 });
      collector.on("collect", async (i) => {
        if (i.customId === "crew_lista") {
          const memberNames = memberProfiles.map((p) => p.name);
          const listaEmbed = new EmbedBuilder()
            .setTitle(`${crew.name} Nakamas`)
            .setDescription(memberNames.length ? memberNames.map((n, idx) => `${idx + 1}. ${n}`).join("\n") : "Sin miembros")
            .setColor("Green");
          const backRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("crew_back").setLabel("Volver").setStyle(ButtonStyle.Secondary),
          );
          await i.update({ embeds: [listaEmbed], components: [backRow] });
        } else if (i.customId === "crew_back") {
          await i.update({ embeds: [embed], components: [row] });
        }
      });
      collector.on("end", () => {
        msg.edit({ components: [] }).catch(() => {});
      });
    }
  },
};
