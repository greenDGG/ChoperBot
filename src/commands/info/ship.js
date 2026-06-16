const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const shipsData = require("../../../data/ships.json");

const SHIPS = {};
for (const s of shipsData) {
  SHIPS[s.id] = s;
}

module.exports = {
  name: "ship",
  alias: ["barco"],
  description: "Muestra la información de tu barco",
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

    const shipId = profile.equipped?.ship || 0;
    const ship = SHIPS[shipId] || SHIPS[0];

    const embed = new EmbedBuilder()
      .setTitle(`${ship.emoji || ""} ${ship.name}`)
      .addFields(
        { name: "Capacidad", value: `${ship.capacity} tripulantes`, inline: true },
        { name: "Velocidad", value: `${ship.speed} nudos`, inline: true },
        { name: "Precio", value: ship.price > 0 ? `<:berri:907114454108491806> ${ship.price.toLocaleString("en-US")}` : "Gratis", inline: true },
      )
      .setColor("Green");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
