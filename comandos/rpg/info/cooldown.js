const Discord = require('discord.js');
const db = require('megadb');
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");

module.exports = {
  name: "cooldown", 
  alias: ["cd"], 
  
async execute (client, message, args){
  let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
  //diario
  let diario = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.tiene`)
  let cdia = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.tiempo`)
  //semanal
  let semanal = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.semanal.tiene`)
  let csem = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.semanal.tiempo`)
  //explorar
  let explorar = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.explorar.tiene`)
  let cex = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.explorar.tiempo`)
  //zarpar
  let zarpar = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.zarpar.tiene`)
  let cza = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.zarpar.tiempo`)
  //mision
  let mision = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.mision.tiene`)
  let cmi = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.mision.tiempo`)
   //pescar
   let pescar = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.pescar.tiene`)
   let cpe = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.pescar.tiempo`)
   //entrenar
   let entrenar = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.entrenar.tiene`)
   let cen = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.entrenar.tiempo`)

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${name} Cooldowns`, message.author.avatarURL())
  .addFields(
      {
          name: "🎁 Recompensas 🎁",
          value: `${diario === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Diario`**" + `${diario === 1 ? `(**${cdia}**)`:""}\n${semanal === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Semanal`**" + `${semanal === 1 ? `(**${csem}**)`:""}`
      },
      {
          name: "🗡️ Experiencia 🗡️",
          value: `${explorar === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Explorar`**" + `${explorar === 1 ? `(**${cex}**)`:""}\n${zarpar === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Zarpar`**" + `${zarpar === 1 ? `(**${cza}**)`:""}` + `\n✅ --- ` + "**`Duelo`**" + `\n${mision === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Mision`**" + `${mision === 1 ? `(**${cmi}**)`:""}`
      },
      {
        name: "🌟 Progresos 🌟",
        value: `${pescar === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Pescar`**" + `${pescar === 1 ? `(**${cpe}**)`:""}\n${entrenar === 1 ? "<:reloj1:911308916779016222>":"✅"} --- ` + "**`Entrenar`**" + `${entrenar === 1 ? `(**${cen}**)`:""}`
      }
  )
  .setColor("RANDOM")
  message.channel.send(embed)


 }

} 