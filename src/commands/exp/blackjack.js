const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const Profile = require("../../models/Profile");

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
  const deck = [];
  for (const s of SUITS)
    for (const v of VALUES) deck.push({ suit: s, value: v });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function handValue(hand) {
  let total = 0, aces = 0;
  for (const c of hand) {
    if (c.value === "A") { aces++; total += 11; }
    else if (["J", "Q", "K"].includes(c.value)) total += 10;
    else total += parseInt(c.value);
  }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

function handStr(hand, hide) {
  if (hide) return `${hand[0].value}${hand[0].suit} | 🂠`;
  return hand.map(c => `${c.value}${c.suit}`).join(" | ");
}

function gameEmbed(profile, author, playerHand, dealerHand, bet, hideDealer, color) {
  const pt = handValue(playerHand);
  const ds = hideDealer ? handStr(dealerHand, true) : handStr(dealerHand);
  return new EmbedBuilder()
    .setAuthor({ name: `${profile.name} — Blackjack`, iconURL: author.displayAvatarURL() })
    .setDescription(`✋ **Tus cartas:** ${handStr(playerHand)} = **${pt}**\n🂠 **Dealer:** ${ds}\n\nApuesta: <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`)
    .setColor(color || "Blue");
}

module.exports = {
  name: "blackjack",
  alias: ["bj", "21"],
  description: "Juega al blackjack contra la casa",
  options: [
    { name: "apuesta", description: "Cantidad a apostar (mín 100)", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash && !messageOrInteraction.deferred) await messageOrInteraction.deferReply();

    let bet;
    if (isSlash) {
      bet = messageOrInteraction.options.getInteger("apuesta");
    } else {
      const a = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      a.shift();
      bet = parseInt(a[0]);
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

    const deck = createDeck();
    const ph = [deck.pop(), deck.pop()];
    const dh = [deck.pop(), deck.pop()];

    if (handValue(ph) === 21) {
      const payout = Math.floor(bet * 1.5);
      profile.bank.cash += bet + payout;
      await profile.save();
      const e = new EmbedBuilder()
        .setAuthor({ name: `${profile.name} — Blackjack`, iconURL: author.displayAvatarURL() })
        .setDescription(`**Blackjack!** 🎉\n\n✋ ${handStr(ph)} = **21**\n🂠 ${handStr(dh)} = **${handValue(dh)}**\n\nGanaste <:berri:907114454108491806>**${payout.toLocaleString("en-US")}**`)
        .setColor("Gold");
      if (isSlash) return messageOrInteraction.editReply({ embeds: [e] });
      return messageOrInteraction.channel.send({ embeds: [e] });
    }

    const btns = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("bj_hit").setLabel("👊 Pedir").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("bj_stand").setLabel("✋ Plantarse").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("bj_double").setLabel("💰 Doblar").setStyle(ButtonStyle.Danger),
    );

    const embed = gameEmbed(profile, author, ph, dh, bet, true);
    const msg = isSlash
      ? await messageOrInteraction.editReply({ embeds: [embed], components: [btns], fetchReply: true })
      : await messageOrInteraction.channel.send({ embeds: [embed], components: [btns] });

    await play(profile, author, msg, deck, ph, dh, bet, btns);
  },
};

async function play(profile, author, msg, deck, ph, dh, bet, btns) {
  if (handValue(ph) > 21) return finish(profile, author, msg, ph, dh, bet, "bust");

  try {
    const i = await msg.awaitMessageComponent({ filter: b => b.user.id === author.id, componentType: ComponentType.Button, time: 30000 });

    if (i.customId === "bj_hit") {
      ph.push(deck.pop());
      await i.update({ components: [] });
      if (handValue(ph) > 21) return finish(profile, author, msg, ph, dh, bet, "bust");
      await msg.edit({ embeds: [gameEmbed(profile, author, ph, dh, bet, true)], components: [btns] });
      return play(profile, author, msg, deck, ph, dh, bet, btns);
    }

    if (i.customId === "bj_double") {
      if (profile.bank.cash < bet) {
        await i.reply({ content: "No tienes suficiente para doblar.", ephemeral: true });
        return play(profile, author, msg, deck, ph, dh, bet, btns);
      }
      profile.bank.cash -= bet;
      bet *= 2;
      await profile.save();
      ph.push(deck.pop());
      await i.update({ components: [] });
      if (handValue(ph) > 21) return finish(profile, author, msg, ph, dh, bet, "bust");
      await msg.edit({ embeds: [gameEmbed(profile, author, ph, dh, bet, true)], components: [] });
      return dealerTurn(profile, author, msg, deck, ph, dh, bet);
    }

    if (i.customId === "bj_stand") {
      await i.update({ components: [] });
      return dealerTurn(profile, author, msg, deck, ph, dh, bet);
    }
  } catch {
    await msg.edit({ components: [] });
    return dealerTurn(profile, author, msg, deck, ph, dh, bet);
  }
}

async function dealerTurn(profile, author, msg, deck, ph, dh, bet) {
  while (handValue(dh) < 17) dh.push(deck.pop());
  if (handValue(dh) > 21) return finish(profile, author, msg, ph, dh, bet, "dealer_bust");
  return finish(profile, author, msg, ph, dh, bet, "compare");
}

async function finish(profile, author, msg, ph, dh, bet, result) {
  const pt = handValue(ph), dt = handValue(dh);
  let desc, color;

  if (result === "bust") {
    desc = `Te pasaste de 21... 💥\n\n✋ ${handStr(ph)} = **${pt}**\n🂠 ${handStr(dh)} = **${dt}**\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`;
    color = "Red";
  } else if (result === "dealer_bust") {
    profile.bank.cash += bet * 2;
    await profile.save();
    desc = `El dealer se pasó! 🎉\n\n✋ ${handStr(ph)} = **${pt}**\n🂠 ${handStr(dh)} = **${dt}**\n\nGanaste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`;
    color = "Green";
  } else {
    if (pt > dt) {
      profile.bank.cash += bet * 2;
      await profile.save();
      desc = `Ganaste! 🎉\n\n✋ ${handStr(ph)} = **${pt}**\n🂠 ${handStr(dh)} = **${dt}**\n\nGanaste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`;
      color = "Green";
    } else if (pt < dt) {
      desc = `Perdiste... 💔\n\n✋ ${handStr(ph)} = **${pt}**\n🂠 ${handStr(dh)} = **${dt}**\n\nPerdiste <:berri:907114454108491806>**${bet.toLocaleString("en-US")}**`;
      color = "Red";
    } else {
      profile.bank.cash += bet;
      await profile.save();
      desc = `Empate! 🤝\n\n✋ ${handStr(ph)} = **${pt}**\n🂠 ${handStr(dh)} = **${dt}**\n\nRecuperaste tu apuesta.`;
      color = "Grey";
    }
  }

  await msg.edit({
    embeds: [new EmbedBuilder()
      .setAuthor({ name: `${profile.name} — Blackjack`, iconURL: author.displayAvatarURL() })
      .setDescription(desc)
      .setColor(color)],
    components: [],
  });
}
