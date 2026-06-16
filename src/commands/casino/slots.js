const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

const EMOJIS = ["🍒", "🔔", "🍀", "💎", "7️⃣", "⭐"];
const PAYOUTS = {
  "🍒🍒🍒": 3, "🔔🔔🔔": 5, "🍀🍀🍀": 10, "💎💎💎": 20, "7️⃣7️⃣7️⃣": 50, "⭐⭐⭐": 100,
  "🍒🍒": 1.5, "🔔🔔": 2, "🍀🍀": 3,
};

module.exports = {
  name: "slots",
  alias: ["tragamonedas", "slot"],
  description: "Juega a las tragamonedas",
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

    const reels = [
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    ];
    const line = reels.join(" | ");

    let multiplier = 0;
    const key3 = reels.join("");
    const key2a = `${reels[0]}${reels[1]}`;
    const key2b = `${reels[1]}${reels[2]}`;
    if (PAYOUTS[key3]) multiplier = PAYOUTS[key3];
    else if (PAYOUTS[key2a]) multiplier = PAYOUTS[key2a];
    else if (PAYOUTS[key2b]) multiplier = PAYOUTS[key2b];

    if (multiplier > 0) {
      const win = Math.floor(bet * multiplier);
      profile.bank.cash += bet + win;
      await profile.save();
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Slots`, iconURL: author.displayAvatarURL() })
        .setDescription(`🎰 **${line}** 🎰\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** (×${multiplier})`)
        .setColor("Gold");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — Slots`, iconURL: author.displayAvatarURL() })
      .setDescription(`🎰 **${line}** 🎰\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`)
      .setColor("Red");
    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
