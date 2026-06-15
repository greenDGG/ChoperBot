const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  alias: ["ayuda"],
  description: "Muestra la lista de comandos disponibles",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();

    const embed = new EmbedBuilder()
      .setDescription("Hola Soy **Choper**, Recuerda usar mi prefix => `op!` en todos los comandos")
      .addFields(
        { name: "Comandos De Informacion", value: "`perfil`, `inventario`, `cooldown`, `top`, `logros`" },
        { name: "Comandos De Aventura", value: "`explorar`, `zarpar`, `duel @usuario`, `pet`" },
        { name: "Comandos De Economia", value: "`tienda`, `abrir`, `comprar`, `vender`, `dar`" },
        { name: "Comandos De Trabajo", value: "`pescar`, `craft [item]`, `recetas`" },
        { name: "Comandos De Casino", value: "`ruleta {rojo o negro} [Berries]`, `loteria`" },
        { name: "Más Recompensas", value: "`daily`, `weekly`, `canjear`" }
      )
      .setColor("Random")
      .setAuthor({ name: "Comandos" })
      .setFooter({ text: "Obtenga mas info con: op!help [comando/evento/item]" });

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
