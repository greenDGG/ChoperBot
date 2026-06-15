const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const Cooldown = require("../models/Cooldown");

module.exports = {
  name: "crear",
  alias: [],
  description: "Crea tu perfil de pirata",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    const existing = await Profile.findOne({ id: author.id });
    if (existing) {
      const reply = "Ya tienes un perfil creado.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.reply(reply);
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("crear_si").setLabel("¡Crear Perfil!").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("crear_no").setLabel("Cancelar").setStyle(ButtonStyle.Danger)
    );

    const embed = new EmbedBuilder()
      .setTitle("¡Bienvenido!")
      .setDescription("¿Estás listo para embarcarte en una gran aventura?")
      .setColor(0x00aeff);

    const send = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [row] })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [row] });

    const filter = (i) => i.user.id === author.id;
    const col = send.createMessageComponentCollector({ filter, time: 60000, max: 1 });

    col.on("collect", async (i) => {
      if (i.customId === "crear_si") {
        await Profile.create({
          id: author.id,
          name: author.username,
          bank: { cash: 1000, bank: 0 },
        });
        await Inventory.create({ id: author.id });
        await Cooldown.create({ id: author.id });
        await i.update({ embeds: [new EmbedBuilder().setTitle("Perfil Creado").setDescription("¡Disfruta tu aventura!").setColor(0x00ff00)], components: [] });
      } else {
        await i.update({ embeds: [new EmbedBuilder().setTitle("Cancelado").setColor(0xff0000)], components: [] });
      }
    });

    col.on("end", async (collected) => {
      if (collected.size === 0) {
        const msg = isSlash ? send : send;
        if (msg.editable) await msg.edit({ embeds: [new EmbedBuilder().setTitle("Tiempo agotado").setColor(0xff0000)], components: [] });
      }
    });
  },
};
