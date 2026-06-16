const { EmbedBuilder } = require("discord.js");
const Profile = require("../models/Profile");
const Crew = require("../models/Crew");
const areasData = require("../../data/areas.json");

module.exports = {
  name: "isla",
  alias: [],
  description: "Muestra requisitos de una isla o viaja a ella",
  options: [
    { name: "numero", description: "Número de isla (1-20)", type: 4, required: true },
  ],
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    let target;
    if (isSlash) {
      target = messageOrInteraction.options.getInteger("numero");
    } else {
      const args = messageOrInteraction.content.slice(client.prefix.length).trim().split(/ +/g);
      args.shift();
      target = parseInt(args[0]);
    }

    if (!target || isNaN(target) || target < 1 || target > 20) {
      const reply = `**${author.username}**, ¿A que isla quieres ir?\nUso correcto: \`op!isla [número de área]\``;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const profile = await Profile.findOne({ id: author.id });
    if (!profile) {
      const reply = "Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const isla = areasData.find(a => a.id === target);
    if (!isla) {
      const reply = "Esa isla no existe.";
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    if (profile.area.areas === target) {
      const reply = `**${author.username}**, ya estás en esta isla`;
      if (isSlash) return messageOrInteraction.editReply({ content: reply });
      return messageOrInteraction.channel.send(reply);
    }

    const hasShip = (profile.equipped.ship || 0) > 0;
    let power = profile.stats.atk + profile.stats.def;
    let crewPower = 0;
    let memberCount = 0;
    let crewName = null;
    let crew = null;

    if (profile.crewId) {
      crew = await Crew.findOne({ id: profile.crewId });
      if (crew) {
        memberCount = crew.players ? crew.players.length : 0;
        crewPower = (crew.totalResources || 0);
        crewName = crew.name;
      }
    }

    const totalPower = profile.crewId && crew ? (power + crewPower) : power;

    if (target > profile.area.maxarea) {
      return showRequirementsAndTravel(isla, profile, crew, author, messageOrInteraction, isSlash, power, totalPower, hasShip, memberCount, crewName);
    }

    profile.area.areas = target;
    profile.area.maxarea = Math.max(profile.area.maxarea, target);
    await profile.save();

    const reply = `**${author.username}** se ha movido a la área #${target}`;
    if (isSlash) return messageOrInteraction.editReply({ content: reply });
    messageOrInteraction.channel.send(reply);
  },
};

async function showRequirementsAndTravel(isla, profile, crew, author, msgOrInt, isSlash, power, totalPower, hasShip, memberCount, crewName) {
  let lines = [];
  const atOk = profile.stats.atk >= isla.reqAt;
  const defOk = profile.stats.def >= isla.reqDef;
  const powerOk = totalPower >= isla.reqPower;
  const shipOk = isla.reqShip <= 0 || hasShip;
  const memberOk = memberCount >= (isla.reqMembers[0] || 0) && memberCount <= (isla.reqMembers[1] || 99);

  lines.push(`${atOk ? "✅" : "❌"} ${isla.reqAt} de AT (${profile.stats.atk})`);
  lines.push(`${defOk ? "✅" : "❌"} ${isla.reqDef} de DEF (${profile.stats.def})`);
  lines.push(`${powerOk ? "✅" : "❌"} ${isla.reqPower.toLocaleString("en-US")} de Poder (${totalPower.toLocaleString("en-US")})`);
  lines.push(`${shipOk ? "✅" : "❌"} ${isla.reqShip} Barco`);
  if (isla.reqMembers[0] > 0) {
    lines.push(`${memberOk ? "✅" : "❌"} ${isla.reqMembers[0]}-${isla.reqMembers[1]} Nakamas (${memberCount})`);
  }
  if (isla.reqSupplies > 0) {
    const suppliesOk = false;
    lines.push(`${suppliesOk ? "✅" : "❌"} ${isla.reqSupplies}% de Suministros`);
  }
  if (isla.reqLog) {
    const logOk = false;
    lines.push(`${logOk ? "✅" : "❌"} 1 Log Poseído`);
  }
  lines.push(`${isla.id}${profile.area.areas === isla.id ? " ✅" : " ❌"} Estar en la isla #${isla.id - 1}`);

  const allMet = atOk && defOk && powerOk && shipOk;

  const embed = new EmbedBuilder()
    .setTitle(`Requisitos para Isla #${isla.id}`)
    .setDescription(lines.join("\n"))
    .setColor(allMet ? "Green" : "Red");

  if (!allMet) {
    if (isSlash) return msgOrInt.editReply({ embeds: [embed] });
    return msgOrInt.channel.send({ embeds: [embed] });
  }

  if (isSlash) {
    await msgOrInt.editReply({ content: `¿Quieres viajar a la isla #${isla.id}?\n\`si\`|\`no\``, embeds: [embed] });
  } else {
    await msgOrInt.channel.send({ content: `¿Quieres viajar a la isla #${isla.id}?\n\`si\`|\`no\``, embeds: [embed] });
  }

  const filter = (m) => m.author.id === author.id;
  const collector = msgOrInt.channel.createMessageCollector({ filter, time: 30000, max: 1 });

  collector.on("collect", async (msg) => {
    const content = msg.content.toLowerCase();
    if (content === "si") {
      msg.channel.send(`**${profile.name}**, ha decidido zarpar a la isla ${isla.id}`);

      if (isla.boss) {
        await handleBoss(msg, author, profile, crew, isla);
      } else {
        await doTravel(msg, author, profile, crew, isla);
      }
    } else {
      msg.channel.send("ok");
    }
    collector.stop();
  });
}

async function handleBoss(msg, author, profile, crew, isla) {
  const boss = isla.boss;
  let bossHp = boss.hp;

  msg.channel.send(`¡Un **${boss.name}** bloquea el camino!\n**${profile.name}**, ¿qué haces?\n\`atacar\`|\`volver\``);

  const col = msg.channel.createMessageCollector({ filter: m => m.author.id === author.id, time: 60000 });
  col.on("collect", async (m) => {
    if (m.content.toLowerCase() === "volver") {
      msg.channel.send("Has vuelto a la isla anterior");
      return col.stop();
    }
    if (m.content.toLowerCase() === "atacar") {
      const crewMembers = crew && crew.players ? crew.players : [];
      const allProfiles = [];
      if (crew && crewMembers.length > 0) {
        for (const mId of crewMembers) {
          const p = await Profile.findById(mId);
          if (p) allProfiles.push(p);
        }
      } else {
        allProfiles.push(profile);
      }

      let totalAtk = 0;
      for (const p of allProfiles) {
        totalAtk += p.stats.atk || 0;
      }

      const roll = Math.floor(Math.random() * totalAtk * 0.5) + Math.floor(totalAtk * 0.5);
      if (roll >= bossHp) {
        msg.channel.send(`**${crew ? crew.name : profile.name}**, ha derrotado al **${boss.name}** y han partido a la isla ${isla.id}`);
        await doTravel(msg, author, profile, crew, isla);
      } else {
        const dmg = Math.floor(Math.random() * boss.atk) + 1;
        profile.stats.health.current = Math.max(0, profile.stats.health.current - dmg);
        await profile.save();
        msg.channel.send(`**${boss.name}** atacó y causó ${dmg} de daño. El viaje se cancela.`);
      }
      col.stop();
    }
  });
}

async function doTravel(msg, author, profile, crew, isla) {
  const travelMs = isla.travelTime || 300000;
  const minutes = Math.floor(travelMs / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let timeStr = "";
  if (hours > 0) timeStr += `${hours}h `;
  timeStr += `${mins}m`;
  timeStr += ` ${Math.floor((travelMs % 60000) / 1000)}s...`;

  msg.channel.send(`**${profile.name || author.username}**, ha zarpado a la isla ${isla.id}\nTiempo de viaje: ${timeStr}`);

  setTimeout(async () => {
    profile.area.areas = isla.id;
    profile.area.maxarea = Math.max(profile.area.maxarea, isla.id);
    await profile.save();
    msg.channel.send(`**${profile.name || author.username}** ha llegado a la isla #${isla.id}`);
  }, travelMs);
}
