const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, StringSelectMenuBuilder } = require("discord.js");
const Profile = require("../../models/Profile");

module.exports = {
  name: "dados",
  alias: ["dice", "dado"],
  description: "Aposta en el lanzamiento de un dado",
  options: [
    { name: "apuesta", description: "Cantidad a apostar", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;
    if (isSlash && !messageOrInteraction.deferred) await messageOrInteraction.deferReply();

    let bet;
    if (isSlash) bet = messageOrInteraction.options.getInteger("apuesta");
    else {
      const a = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      a.shift(); bet = parseInt(a[0]);
    }

    if (!bet || isNaN(bet) || bet < 100) {
      const r = "Apuesta mínima: **100** berries";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const r = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }
    if (bet > profile.bank.cash) {
      const r = "No tienes suficiente dinero.";
      if (isSlash) return messageOrInteraction.editReply({ content: r });
      return messageOrInteraction.channel.send(r);
    }

    profile.bank.cash -= bet;
    await profile.save();

    const select = new StringSelectMenuBuilder()
      .setCustomId("dados_bet")
      .setPlaceholder("Elige tu apuesta...")
      .addOptions([
        { label: "Número exacto (paga ×5)", value: "exact", emoji: "🎯" },
        { label: "Par o Impar (paga ×1.9)", value: "parity", emoji: "🔢" },
        { label: "Alto (4-6) o Bajo (1-3) (paga ×1.9)", value: "range", emoji: "📈" },
      ]);

    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
      .setDescription("Elige tu tipo de apuesta:")
      .setColor("Blue");

    const msg = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [row], fetchReply: true })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [row] });

    try {
      const si = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.StringSelect, time: 20000 });

      if (si.values[0] === "exact") {
        await playExact(profile, author, msg, isSlash, bet, si);
      } else if (si.values[0] === "parity") {
        await playParity(profile, author, msg, isSlash, bet, si);
      } else {
        await playRange(profile, author, msg, isSlash, bet, si);
      }
    } catch {
      profile.bank.cash += bet;
      await profile.save();
      await msg.edit({ components: [] });
    }
  },
};

async function playExact(profile, author, msg, isSlash, bet, si) {
  const btns = new ActionRowBuilder();
  for (let i = 1; i <= 6; i++) {
    btns.addComponents(new ButtonBuilder().setCustomId(`dice_${i}`).setLabel(`${i}`).setStyle(ButtonStyle.Primary));
  }
  await si.update({ content: "Elige un número del 1 al 6:", components: [btns], embeds: [] });

  try {
    const bi = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });
    const pick = parseInt(bi.customId.split("_")[1]);
    const roll = Math.floor(Math.random() * 6) + 1;

    if (roll === pick) {
      const win = bet * 5;
      profile.bank.cash += bet + win;
      await profile.save();
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick}** 🎯 | Salió **${roll}**\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** (×5) 🎉`)
        .setColor("Gold");
      await bi.update({ embeds: [e], components: [] });
    } else {
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick}** 🎯 | Salió **${roll}**\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`)
        .setColor("Red");
      await bi.update({ embeds: [e], components: [] });
    }
  } catch {
    profile.bank.cash += bet;
    await profile.save();
    await msg.edit({ components: [] });
  }
}

async function playParity(profile, author, msg, isSlash, bet, si) {
  const btns = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("par_par").setLabel("🟢 Par").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("par_impar").setLabel("🔴 Impar").setStyle(ButtonStyle.Danger),
  );
  await si.update({ content: "¿Par o Impar?", components: [btns], embeds: [] });

  try {
    const bi = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });
    const pick = bi.customId.split("_")[1];
    const roll = Math.floor(Math.random() * 6) + 1;
    const isEven = roll % 2 === 0;
    const won = (pick === "par" && isEven) || (pick === "impar" && !isEven);

    if (won) {
      const win = Math.floor(bet * 1.9);
      profile.bank.cash += bet + win;
      await profile.save();
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick === "par" ? "Par" : "Impar"}** | Salió **${roll}** (${isEven ? "Par" : "Impar"})\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** 🎉`)
        .setColor("Green");
      await bi.update({ embeds: [e], components: [] });
    } else {
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick === "par" ? "Par" : "Impar"}** | Salió **${roll}** (${isEven ? "Par" : "Impar"})\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`)
        .setColor("Red");
      await bi.update({ embeds: [e], components: [] });
    }
  } catch {
    profile.bank.cash += bet;
    await profile.save();
    await msg.edit({ components: [] });
  }
}

async function playRange(profile, author, msg, isSlash, bet, si) {
  const btns = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("range_alto").setLabel("📈 Alto (4-6)").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("range_bajo").setLabel("📉 Bajo (1-3)").setStyle(ButtonStyle.Success),
  );
  await si.update({ content: "¿Alto (4-6) o Bajo (1-3)?", components: [btns], embeds: [] });

  try {
    const bi = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 20000 });
    const pick = bi.customId.split("_")[1];
    const roll = Math.floor(Math.random() * 6) + 1;
    const isHigh = roll >= 4;
    const won = (pick === "alto" && isHigh) || (pick === "bajo" && !isHigh);

    if (won) {
      const win = Math.floor(bet * 1.9);
      profile.bank.cash += bet + win;
      await profile.save();
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick === "alto" ? "Alto" : "Bajo"}** | Salió **${roll}** (${isHigh ? "Alto" : "Bajo"})\n\nGanaste <:berri:907114454108491806>**${win.toLocaleString("en-US")}** 🎉`)
        .setColor("Green");
      await bi.update({ embeds: [e], components: [] });
    } else {
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Dados`, iconURL: author.displayAvatarURL() })
        .setDescription(`Elegiste **${pick === "alto" ? "Alto" : "Bajo"}** | Salió **${roll}** (${isHigh ? "Alto" : "Bajo"})\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}** 💔`)
        .setColor("Red");
      await bi.update({ embeds: [e], components: [] });
    }
  } catch {
    profile.bank.cash += bet;
    await profile.save();
    await msg.edit({ components: [] });
  }
}
