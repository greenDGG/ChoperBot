const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "top",
  alias: ["rank"],
  description: "Ranking global de berries o recompensa",
  options: [
    {
      name: "tipo",
      description: "Tipo de ranking",
      type: 3,
      required: false,
      choices: [
        { name: "Berries", value: "berries" },
        { name: "Recompensa", value: "bounty" },
      ],
    },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let tipo;
    if (isSlash) {
      tipo = messageOrInteraction.options.getString("tipo") || "berries";
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      tipo = args[1]?.toLowerCase() === "bounty" ? "bounty" : "berries";
    }

    if (tipo === "bounty") {
      const profiles = await Profile.find({}).sort({ "progress.bounty": -1 }).limit(10).lean();
      let final = "";
      for (let i = 0; i < profiles.length; i++) {
        const p = profiles[i];
        const path = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"][i] || `${i + 1}.`;
        final += `${path}. <:berri:907114454108491806>**${p.progress.bounty.toLocaleString("en-US")}** - ${p.name}\n`;
      }
      const embed = new EmbedBuilder()
        .setTitle("RANKING GLOBAL (RECOMPENSA)")
        .setDescription(final || "No hay datos aún")
        .setColor("Green");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    const profiles = await Profile.find({}).sort({ "bank.deposited": -1, "bank.cash": -1 }).limit(10).lean();
    let final = "";
    for (let i = 0; i < profiles.length; i++) {
      const p = profiles[i];
      const total = p.bank.cash + p.bank.deposited;
      const path = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"][i] || `${i + 1}.`;
      final += `${path}. <:berri:907114454108491806>**${total.toLocaleString("en-US")}** - ${p.name}\n`;
    }
    const embed = new EmbedBuilder()
      .setTitle("RANKING GLOBAL (BERRIES)")
      .setDescription(final || "No hay datos aún")
      .setColor("Green");
    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
