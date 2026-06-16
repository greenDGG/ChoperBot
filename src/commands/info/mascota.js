const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Pet = require("../../models/Pet");
const petsData = require("../../../data/pets.json");

const PET_MAP = {};
for (const p of petsData) {
  PET_MAP[p.id] = p;
}

module.exports = {
  name: "mascota",
  alias: ["pets"],
  description: "Muestra tu mascota",
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

    let pet = await Pet.findOne({ id: author.id });
    if (!pet) {
      pet = await Pet.create({ id: author.id });
    }

    const petTemplate = PET_MAP[pet.petId];

    const name = pet.name || (petTemplate ? petTemplate.emoji + " " + petTemplate.name : "Sin mascota");
    const xpPercent = pet.xpMax > 0 ? Math.round((pet.xp / pet.xpMax) * 100) : 0;
    const thumbnail = pet.img || petTemplate?.img || "";

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Mascota de ${profile.name}` })
      .setTitle(name)
      .setDescription(`**Nivel:** ${pet.level} (${xpPercent}%)\n**XP:** ${pet.xp}/${pet.xpMax}`)
      .setFooter({ text: pet.acquiredAt ? `Compañero desde ${pet.acquiredAt}` : "" })
      .setColor("Green");
    if (thumbnail) embed.setThumbnail(thumbnail);

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
