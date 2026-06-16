const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RANK = { A: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13 };

module.exports = {
  name: "highlow",
  alias: ["hl"],
  description: "Adivina si la siguiente carta es mayor o menor",
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

    const deck = [...VALUES];
    const current = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
    const next = deck[Math.floor(Math.random() * deck.length)];

    const btns = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("hl_high").setLabel("⬆ Mayor").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("hl_low").setLabel("⬇ Menor").setStyle(ButtonStyle.Success),
    );

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — High-Low`, iconURL: author.displayAvatarURL() })
      .setDescription(`Carta actual: **${current}**\n\n¿La siguiente será mayor o menor?`)
      .setColor("Blue");

    const msg = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [btns], fetchReply: true })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [btns] });

    try {
      const i = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });
      const guess = i.customId === "hl_high" ? "high" : "low";
      const won = (guess === "high" && RANK[next] > RANK[current]) || (guess === "low" && RANK[next] < RANK[current]);
      const tie = RANK[next] === RANK[current];

      if (tie) {
        profile.bank.cash += bet;
        await profile.save();
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — High-Low`, iconURL: author.displayAvatarURL() })
          .setDescription(`Carta actual: **${current}** → Siguiente: **${next}**\n\nEmpate! Recuperaste tu apuesta 🤝`)
          .setColor("Grey");
        await i.update({ embeds: [e], components: [] });
        return;
      }

      if (won) {
        const win = Math.floor(bet * 1.9);
        profile.bank.cash += bet + win;
        await profile.save();
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — High-Low`, iconURL: author.displayAvatarURL() })
          .setDescription(`Carta actual: **${current}** → Siguiente: **${next}**\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** 🎉`)
          .setColor("Green");
        await i.update({ embeds: [e], components: [] });
      } else {
        const e = new EmbedBuilder()
          .setAuthor({ name: `${profile.name} — High-Low`, iconURL: author.displayAvatarURL() })
          .setDescription(`Carta actual: **${current}** → Siguiente: **${next}**\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`)
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
