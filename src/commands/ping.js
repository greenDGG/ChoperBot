const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  alias: [],
  description: "Muestra la latencia del bot",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setDescription(`Latencia: ${Date.now() - messageOrInteraction.createdTimestamp}ms\nAPI: ${Math.round(client.ws.ping)}ms`)
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
