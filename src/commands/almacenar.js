const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const Crew = require("../models/Crew");

const STORABLE = ["pez_azul", "pez_dorado", "pez_asfur", "sushi", "omusubi", "carne", "paleta"];

module.exports = {
  name: "almacenar",
  alias: ["guardar"],
  description: "Almacena items en la tripulación",
  options: [
    { name: "item", description: "Item a almacenar", type: 3, required: true },
    { name: "cantidad", description: "Cantidad", type: 4, required: false },
  ],
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

    if (!profile.crewId) {
      const reply = "No tienes una tripulación.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let itemName, cantidad = 1;
    if (isSlash) {
      itemName = messageOrInteraction.options.getString("item").toLowerCase();
      cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      itemName = args[0]?.toLowerCase();
      cantidad = parseInt(args[1]) || 1;
    }

    if (!itemName) {
      const reply = "¿Que deseas almacenar?";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let matched = null;
    const fishData = require("../../data/fishs.json");
    for (const f of fishData) {
      if (f.id === itemName || f.name.toLowerCase() === itemName) {
        matched = { id: f.id, name: f.name, emoji: f.emoji };
        break;
      }
    }
    if (!matched && STORABLE.includes(itemName)) {
      const itemsData = require("../../data/items.json");
      for (const i of itemsData) {
        if (String(i.id).toLowerCase() === itemName || i.name.toLowerCase() === itemName) {
          if (i.type === "food") {
            matched = { id: i.id, name: i.name, emoji: i.emoji || "📦" };
          }
          break;
        }
      }
    }

    if (!matched) {
      const reply = "No puedes almacenar " + itemName;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const inv = await Inventory.findOne({ id: author.id });
    const owned = inv ? (inv.items.get(String(matched.id)) || 0) : 0;

    if (cantidad > owned) {
      const reply = "No tienes suficientes items para almacenar.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const crew = await Crew.findOne({ id: profile.crewId });
    if (!crew) {
      const reply = "Tu tripulación ya no existe.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const key = String(matched.id);
    if (inv) {
      const remaining = owned - cantidad;
      if (remaining <= 0) inv.items.delete(key);
      else inv.items.set(key, remaining);
      await inv.save();
    }

    const crewCurrent = crew.resources.get(key) || 0;
    crew.resources.set(key, crewCurrent + cantidad);
    crew.totalResources += cantidad;
    await crew.save();

    const reply = `Has almacenado ${cantidad} ${matched.emoji} **${matched.name}** con exito.`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};
