const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const Cooldown = require("../models/Cooldown");
const islas = require("../../data/islas.json");
const rolesData = require("../../data/roles.json");
const hakiData = require("../../data/haki.json");

const roleMap = {};
for (const r of rolesData) {
  roleMap[r.name.toLowerCase()] = r.id;
}

module.exports = {
  name: "crear",
  alias: ["start"],
  description: "Crea tu perfil de pirata para comenzar la aventura",
  options: [
    { name: 'nombre', description: 'Nombre de tu personaje', type: 3, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    let nombre;
    let msg;

    if (isSlash) {
      nombre = messageOrInteraction.options.getString('nombre');
      const existing = await Profile.findOne({ id: author.id });
      if (existing) {
        return messageOrInteraction.reply({ embeds: [new EmbedBuilder().setDescription("Ya Tienes Un Perfil Creado.").setColor(0x00FF00)], ephemeral: true });
      }
      if (!nombre) {
        return messageOrInteraction.reply({ content: 'Necesitas decir un nombre.', ephemeral: true });
      }
      await messageOrInteraction.deferReply();
      const roleEmbed = buildRoleEmbed(nombre);
      const { row1, row2 } = buildRoleRows();
      await messageOrInteraction.editReply({ embeds: [roleEmbed], components: [row1, row2] });
      msg = await messageOrInteraction.fetchReply();
    } else {
      const channel = messageOrInteraction.channel;
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      nombre = args.join(' ');
      const existing = await Profile.findOne({ id: author.id });
      if (existing) {
        return channel.send({ embeds: [new EmbedBuilder().setDescription("Ya Tienes Un Perfil Creado.").setColor(0x00FF00)] });
      }
      if (!nombre) {
        return channel.send({ embeds: [new EmbedBuilder().setDescription(`${author}, para crear tu perfil necesito que me digas un nombre para el perfil.`).setFooter({ text: "[op!crear {nombre}]" }).setColor(0x00FF00)] });
      }
      const roleEmbed = buildRoleEmbed(nombre);
      const { row1, row2 } = buildRoleRows();
      msg = await channel.send({ embeds: [roleEmbed], components: [row1, row2] });
    }

    const roleCollector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: i => i.user.id === author.id,
      time: 60000 * 6,
      max: 1,
    });

    roleCollector.on('collect', async (i) => {
      await i.deferUpdate();

      const rol = roleMap[i.customId] || 0;

      const hak = Math.floor(Math.random() * 100);
      const haki = [
        { id: 1, level: 1, xp: 0 },
        { id: 2, level: 1, xp: 0 },
      ];
      if (hak <= 3) haki.push({ id: 3, level: 1, xp: 0 });

      const marKeys = Object.keys(islas);
      const marKey = marKeys[Math.floor(Math.random() * marKeys.length)];
      const marName = marKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const island = islas[marKey][Math.floor(Math.random() * islas[marKey].length)];

      const inventory = await Inventory.create({ id: author.id });
      const cooldown = await Cooldown.create({ id: author.id });

      await Profile.create({
        id: author.id,
        name: nombre,
        role: rol,
        inventory: inventory.id,
        area: { mar: marName, isla: island.name, areas: 1, maxarea: 1 },
        haki: haki,
        equipped: { ship: 1 },
      });

      const embed = new EmbedBuilder()
        .setTitle("Perfil Creado Con Exito")
        .setDescription(`Bienvenido **${nombre}** Comienza Con Tu Aventura\nPuedes Visualizar Tu Perfil Con ` + "`op!perfil`")
        .setFooter({ text: 'Para mas informacion ponga `op!help`' })
        .setColor(0x00FF00);

      await i.editReply({ embeds: [embed], components: [] });
      if (!isSlash) msg.delete().catch(() => {});
    });
  }
};

function buildRoleEmbed(nombre) {
  return new EmbedBuilder()
    .setAuthor({ name: `Creacion De Personaje Para ${nombre}` })
    .setTitle('Seleciona tu Rol')
    .setDescription(`Selecciona el **Rol** de tu personaje **${nombre}**`)
    .addFields(
      { name: 'Doctor', value: '<:SimboloHospital:901623144631128135>\nPodras curar a todas las personas que quieras\ny tendras +15 de Vida x Nivel', inline: true },
      { name: 'Espadachin', value: '⚔\nTendras un +10% de Ataque usando una espada/katana\ny tendras +4 de Defenza x Nivel', inline: true },
      { name: 'Tirador', value: '🔫\nTendras Mas posibilidades de pegar criticos con armas/cañones\ny tendras +4 de Ataque x Nivel', inline: true },
      { name: 'Arqueologo', value: '🔍\nTendras mas posibilidades de encontrar cofres u objectos perdidos(incluyendo frutas)', inline: true },
      { name: 'Navegante', value: '🧭\nTendras menos posibilidades de perderte en el gran mar del One Piece\nY tendras muchas posibilidades de encontrar objetos al Zarpar\nY tendras un x2 de dinero', inline: true },
      { name: 'Cyborg', value: '🤖\nTendras +6 de Ataque, +8 de Defenza x Nivel', inline: true },
    )
    .setColor(0x00FF00)
    .setFooter({ text: 'Una vez que eliges el Rol No se puede cambiar' });
}

function buildRoleRows() {
  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('doctor').setLabel('Doctor').setEmoji('<:SimboloHospital:901623144631128135>').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('espadachin').setLabel('Espadachin').setEmoji('⚔').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId('tirador').setLabel('Tirador').setEmoji('🔫').setStyle(ButtonStyle.Secondary),
  );
  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('arqueologo').setLabel('Arqueologo').setEmoji('🔍').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('navegante').setLabel('Navegante').setEmoji('🧭').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('cyborg').setLabel('Cyborg').setEmoji('🤖').setStyle(ButtonStyle.Secondary),
  );
  return { row1, row2 };
}
