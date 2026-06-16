const Profile = require("../models/Profile");
const Crew = require("../models/Crew");

module.exports = {
  name: "cambiar",
  alias: ["cnombre", "cname"],
  description: "Cambia el nombre de tu personaje (3 cambios máx)",
  options: [
    { name: "nombre", description: "Nuevo nombre", type: 3, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let nuevoNombre;
    if (isSlash) {
      nuevoNombre = messageOrInteraction.options.getString("nombre");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      nuevoNombre = args.join(" ");
    }

    if (!nuevoNombre) {
      const reply = "Di el nombre por cual te quieras cambiar.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (profile.nameChanges >= 3) {
      const reply = "Lo siento pero ya no puedes cambiar mas tu nombre.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const oldName = profile.name;
    profile.name = nuevoNombre;
    profile.nameChanges += 1;
    await profile.save();

    if (profile.crewId) {
      const crew = await Crew.findOne({ id: profile.crewId });
      if (crew) {
        await crew.save();
      }
    }

    const reply = `Nombre Cambiado por ${nuevoNombre} con exito`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
