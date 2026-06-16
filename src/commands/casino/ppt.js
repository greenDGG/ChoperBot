const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

const OPTIONS = ["piedra", "papel", "tijera"];
const BEATS = { piedra: "tijera", papel: "piedra", tijera: "papel" };
const EMOJIS = { piedra: "🪨", papel: "📄", tijera: "✂️" };

module.exports = {
  name: "ppt",
  alias: ["piedrapapeltijera", "rps"],
  description: "Piedra, Papel o Tijera contra la casa",
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

    const btns = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("rps_piedra").setLabel("🪨 Piedra").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("rps_papel").setLabel("📄 Papel").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("rps_tijera").setLabel("✂️ Tijera").setStyle(ButtonStyle.Secondary),
    );

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — PPT`, iconURL: author.displayAvatarURL() })
      .setDescription("Elige tu jugada:")
      .setColor("Blue");

    const msg = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [btns], fetchReply: true })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [btns] });

    try {
      const i = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });
      const playerPick = i.customId.split("_")[1];
      const housePick = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];

      if (playerPick === housePick) {
        profile.bank.cash += bet;
        await profile.save();
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — PPT`, iconURL: author.displayAvatarURL() })
          .setDescription(`${EMOJIS[playerPick]} vs ${EMOJIS[housePick]}\n\nEmpate! Recuperaste tu apuesta 🤝`)
          .setColor("Grey");
        await i.update({ embeds: [e], components: [] });
        return;
      }

      if (BEATS[playerPick] === housePick) {
        const win = Math.floor(bet * 1.8);
        profile.bank.cash += bet + win;
        await profile.save();
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — PPT`, iconURL: author.displayAvatarURL() })
          .setDescription(`${EMOJIS[playerPick]} vs ${EMOJIS[housePick]}\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** 🎉`)
          .setColor("Green");
        await i.update({ embeds: [e], components: [] });
      } else {
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — PPT`, iconURL: author.displayAvatarURL() })
          .setDescription(`${EMOJIS[playerPick]} vs ${EMOJIS[housePick]}\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`)
          .setColor("Red");
        await i.update({ embeds: [e], components: [] });
      }
    } catch {
      profile.bank.cash += bet;
      await profile.save();
      await msg.edit({ components: [] });
    }
  },
};
