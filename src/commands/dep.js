const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Crew = require("../models/Crew");

function parseAmount(input) {
  if (!input) return null;
  const s = input.toLowerCase().trim();
  if (s === "all") return "all";
  const match = s.match(/^(\d+(?:\.\d+)?)([kmb])?$/);
  if (!match) return null;
  let num = parseFloat(match[1]);
  const suffix = match[2];
  if (suffix === "k") num *= 1000;
  else if (suffix === "m") num *= 1000000;
  else if (suffix === "b") num *= 1000000000;
  return Math.floor(num);
}

module.exports = {
  name: "dep",
  alias: ["depositar"],
  description: "Deposita berries en el banco",
  options: [
    { name: "cantidad", description: "Cantidad a depositar (o 'all')", type: 3, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let input;
    if (isSlash) {
      input = messageOrInteraction.options.getString("cantidad");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      input = args.join(" ");
    }

    if (!input) {
      const reply = "Pon la cantidad que quieres depositar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (!profile.equipped?.ship || profile.equipped.ship === 0) {
      const reply = "Necesitas un barco para guardar el dinero";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let cantidad;
    if (input.toLowerCase() === "all") {
      cantidad = profile.bank.cash;
    } else {
      cantidad = parseAmount(input);
      if (cantidad === null || isNaN(cantidad)) {
        const reply = "Pon la cantidad que quieres depositar...";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }
    }

    if (cantidad <= 0) {
      const reply = "No Tienes Dinero Para Depositar...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (cantidad > profile.bank.cash) {
      const reply = "No puedes depositar mas de lo que tienes";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    profile.bank.cash -= cantidad;
    profile.bank.deposited += cantidad;
    await profile.save();

    if (profile.crewId) {
      const crew = await Crew.findOne({ id: profile.crewId });
      if (crew) {
        crew.cash += cantidad;
        await crew.save();
      }
    }

    const embed = new EmbedBuilder()
      .setDescription(`Has guardado <:berri:907114454108491806>${cantidad.toLocaleString("en-US")} Berris`)
      .setColor("Green");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
