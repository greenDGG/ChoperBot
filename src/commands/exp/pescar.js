const { EmbedBuilder } = require("discord.js");
const Profile = require("../../models/Profile");
const Inventory = require("../../models/Inventory");
const Cooldown = require("../../models/Cooldown");
const Mission = require("../../models/Mission");
const fishData = require("../../../data/fishs.json");
const rodsData = require("../../../data/items.json").filter(i => i.type === "fishing_rod");

const FISH_MAP = {};
for (const f of fishData) {
  FISH_MAP[f.id] = f;
}

const ROD_MAP = {};
for (const r of rodsData) {
  ROD_MAP[r.id] = r;
}

const COOLDOWN_FISH = 150000;

module.exports = {
  name: "pescar",
  alias: ["fish"],
  description: "Pesca en busca de peces",
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

    let cd = await Cooldown.findOne({ id: author.id });
    if (!cd) cd = await Cooldown.create({ id: author.id });

    const isWeekend = [0, 6].includes(new Date().getDay());
    const cdTime = isWeekend ? COOLDOWN_FISH : COOLDOWN_FISH * 2;
    const now = Date.now();
    if (cd.fish && now - cd.fish < cdTime) {
      const remaining = cdTime - (now - cd.fish);
      const m = Math.floor(remaining / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      const reply = `Ya Has Pescado, Espera Unos **${m}m ${s}s...**`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    let inv = await Inventory.findOne({ id: author.id });
    if (!inv) inv = await Inventory.create({ id: author.id });

    const rodIds = Object.keys(ROD_MAP).map(Number);
    let hasRod = null;
    for (const rid of rodIds) {
      if ((inv.items.get(String(rid)) || 0) > 0) {
        if (!hasRod || rid > hasRod.id) hasRod = { id: rid, data: ROD_MAP[rid] };
      }
    }

    if (!hasRod) {
      const reply = "Necesitas una caña de pescar.\nComprala en la tienda";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const area = profile.area.areas || 1;
    const rod = hasRod.data;
    const n = profile.role === 2 ? 2 : 1;

    const availableFish = fishData.filter(f => f.areas.includes(area));
    if (availableFish.length === 0) {
      const reply = "No hay peces en esta area...";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const roll = Math.floor(Math.random() * 100) - rod.suerte;
    let caughtFish, quantity;

    if (roll <= 5) {
      const legendaries = availableFish.filter(f => f.rarity === "legendary");
      caughtFish = legendaries.length > 0 ? legendaries[Math.floor(Math.random() * legendaries.length)] : null;
      quantity = 1;
    } else if (roll <= 15) {
      const epics = availableFish.filter(f => f.rarity === "epic");
      caughtFish = epics.length > 0 ? epics[Math.floor(Math.random() * epics.length)] : null;
      quantity = Math.floor(Math.random() * rod.p) + 1 || 1;
    } else if (roll <= 30) {
      const rares = availableFish.filter(f => f.rarity === "rare");
      caughtFish = rares.length > 0 ? rares[Math.floor(Math.random() * rares.length)] : null;
      quantity = Math.floor(Math.random() * rod.p) + 1 || 1;
    } else if (roll <= 60) {
      const uncommons = availableFish.filter(f => f.rarity === "uncommon");
      caughtFish = uncommons.length > 0 ? uncommons[Math.floor(Math.random() * uncommons.length)] : null;
      quantity = Math.floor(Math.random() * (rod.plus + 1)) + 1 || 1;
    } else {
      const commons = availableFish.filter(f => f.rarity === "common");
      caughtFish = commons.length > 0 ? commons[Math.floor(Math.random() * commons.length)] : null;
      quantity = Math.floor(Math.random() * (rod.plus + 2)) + 1 || 1;
    }

    if (!caughtFish) {
      caughtFish = availableFish[Math.floor(Math.random() * availableFish.length)];
      quantity = 1;
    }

    if (isWeekend) quantity *= 2;

    const current = inv.items.get(caughtFish.id) || 0;
    inv.items.set(caughtFish.id, current + quantity);
    await inv.save();

    cd.fish = now;
    await cd.save();

    const fishName = quantity > 1 ? `${caughtFish.emoji} ${caughtFish.name} x${quantity}` : `${caughtFish.emoji} ${caughtFish.name}`;
    const reply = `**${profile.name}**, atrapaste **${quantity} ${caughtFish.emoji} ${caughtFish.name}**`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);

    const missionDoc = await Mission.findOne({ id: author.id });
    if (missionDoc) {
      for (const m of missionDoc.activeMissions) {
        const missionData = require("../../../data/misions.json").find(d => d.id === m.missionId);
        if (missionData && missionData.type === "pescar" && !m.completed) {
          m.progress = Math.min(m.progress + quantity, m.target);
          if (m.progress >= m.target) m.completed = true;
        }
      }
      await missionDoc.save();
    }
  },
};
