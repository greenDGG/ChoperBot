const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");
const Lottery = require("../models/Lottery");

const TICKET_ID = "1015";

module.exports = {
  name: "loteria",
  alias: ["lottery"],
  description: "Compra boletos de lotería y revisa el pozo",
  options: [
    {
      name: "buy",
      description: "Compra boletos de lotería",
      type: 1,
      options: [
        { name: "cantidad", description: "Cantidad de boletos", type: 4, required: false },
      ],
    },
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

    const lottery = await Lottery.findOneAndUpdate(
      {},
      { $setOnInsert: { pot: 0, participants: [], lastWinners: [], ticketPrice: 1000 } },
      { upsert: true, new: true }
    );

    let subcommand;
    let cantidad;
    if (isSlash) {
      subcommand = messageOrInteraction.options.getSubcommand();
      if (subcommand === "buy") cantidad = messageOrInteraction.options.getInteger("cantidad") || 1;
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      subcommand = args[0] === "loteria" || args[0] === "lottery" ? args[1] : null;
      cantidad = parseInt(args[2]) || 1;
    }

    if (subcommand === "buy") {
      const total = lottery.ticketPrice * cantidad;

      if (profile.bank.cash < total) {
        const reply = "no tienes suficiente dinero";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      if (cantidad >= 101) {
        const reply = "Ehh cuantos boletos quieres comprar?";
        if (isSlash) return messageOrInteraction.editReply({ content: reply });
        return messageOrInteraction.channel.send(reply);
      }

      profile.bank.cash -= total;
      await profile.save();

      let inv = await Inventory.findOne({ id: author.id });
      if (!inv) inv = await Inventory.create({ id: author.id });
      const current = inv.items.get(TICKET_ID) || 0;
      inv.items.set(TICKET_ID, current + cantidad);
      await inv.save();

      for (let i = 0; i < cantidad; i++) {
        lottery.participants.push(author.id);
      }
      lottery.pot += total * 2;
      await lottery.save();

      const reply = `**${profile.name}**, Has comprado ${cantidad > 1 ? cantidad + " boletos" : "1 boleto"} de loteria por <:berri:907114454108491806>${total.toLocaleString("en-US")} Berries`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const now = new Date();
    const utcHour = now.getUTCHours();
    const utcMin = now.getUTCMinutes();
    let hoursLeft = (16 - utcHour + 24) % 24;
    let minsLeft = (0 - utcMin + 60) % 60;
    if (minsLeft === 60) { minsLeft = 0; }
    const nextDraw = `${hoursLeft}h ${minsLeft}m`;

    const lastWinner = lottery.lastWinners.length > 0
      ? lottery.lastWinners[0]
      : null;
    let lastWinnerStr = "Nadie aún";
    if (lastWinner) {
      const wp = await Profile.findOne({ id: lastWinner.id });
      lastWinnerStr = wp ? `**${wp.name}** - <:berri:907114454108491806>${lastWinner.amount.toLocaleString("en-US")}` : lastWinner.id;
    }

    const embed = new EmbedBuilder()
      .setDescription("Puedes comprar un boleto con `op!loteria buy [cantidad]`")
      .addFields(
        {
          name: "Loteria",
          value: `🎫 **Precio:** ${lottery.ticketPrice.toLocaleString("en-US")} Berries\n<:berri:907114454108491806> **Pozo:** ${lottery.pot.toLocaleString("en-US")} Berries\n🕘 **Siguiente sorteo:** ${nextDraw}`,
        },
        {
          name: "🎉 Último ganador 🎉",
          value: lastWinnerStr,
        }
      )
      .setColor("Green");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
