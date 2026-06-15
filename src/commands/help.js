const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  alias: [],
  description: "Muestra la lista de comandos disponibles",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const commands = [...client.commands.keys()].filter((k) => !client.commands.get(k).alias?.length);
    const embed = new EmbedBuilder()
      .setTitle("Comandos disponibles")
      .setDescription(commands.map((c) => `\`${client.prefix}${c}\``).join("\n"))
      .setColor(0x00aeff);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
