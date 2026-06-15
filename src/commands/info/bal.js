const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "bal",
  alias: ["balance", "dinero"],
  description: "Muestra tu saldo de berries",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "No tienes un perfil.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const embed = new EmbedBuilder()
      .setTitle(`Saldo de ${profile.name}`)
      .addFields(
        { name: "Efectivo", value: `${profile.bank.cash.toLocaleString()} <:berri:907114454108491806>`, inline: true },
        { name: "Banco", value: `${profile.bank.deposited.toLocaleString()} <:berri:907114454108491806>`, inline: true }
      )
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
