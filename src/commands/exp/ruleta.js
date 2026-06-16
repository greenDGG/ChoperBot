const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "ruleta",
  alias: ["roulette", "rt"],
  description: "Apuesta en la ruleta (rojo/negro)",
  options: [
    { name: "monto", description: "Cantidad a apostar (mínimo 100)", type: 4, required: true },
    { name: "color", description: "Color: rojo o negro", type: 3, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let mor, co;
    if (isSlash) {
      mor = messageOrInteraction.options.getInteger("monto");
      co = messageOrInteraction.options.getString("color").toLowerCase();
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      mor = parseInt(args[0]);
      co = args[1]?.toLowerCase();
    }

    if (!mor || isNaN(mor) || mor < 100) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: author.username, iconURL: author.displayAvatarURL({ dynamic: true }) })
        .setDescription("Debes poner una cantidad de dinero para apostar.\nEl mínimo de dinero para apostar es de **100**")
        .setColor("Red");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    if (!co || (co !== "rojo" && co !== "negro")) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: author.username, iconURL: author.displayAvatarURL({ dynamic: true }) })
        .setDescription("Solo puedes poner `rojo` o `negro`.")
        .setColor("Red");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (mor > profile.bank.cash) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: author.username, iconURL: author.displayAvatarURL({ dynamic: true }) })
        .setDescription("No tienes suficiente dinero.")
        .setColor("Red");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }

    const isNavigator = profile.role === 2;
    const multiplier = isNavigator ? 3 : 2;
    const gan = mor * multiplier;

    const colors = ["rojo", "negro"];
    const result = colors[Math.floor(Math.random() * colors.length)];

    profile.bank.cash -= mor;
    let won = false;

    if (result === co) {
      profile.bank.cash += mor + gan;
      won = true;
    }
    await profile.save();

    const resultEmoji = result === "rojo" ? "🔴" : "⚫";
    const description = won
      ? `La bola cayó en el color ${resultEmoji}**${result}**${resultEmoji}\n\nDinero ganado: <:berri:907114454108491806>**${gan.toLocaleString("en-US")}**`
      : `La bola cayó en el color ${resultEmoji}**${result}**${resultEmoji}\n\nDinero perdido: <:berri:907114454108491806>**${mor.toLocaleString("en-US")}**`;

    const embed = new EmbedBuilder()
      .setAuthor({ name: author.username, iconURL: author.displayAvatarURL({ dynamic: true }) })
      .setDescription(description)
      .setColor(won ? "Green" : "Red");

    if (isSlash) return messageOrInteraction.editReply({ embeds: [embed] });
    messageOrInteraction.channel.send({ embeds: [embed] });
  },
};
