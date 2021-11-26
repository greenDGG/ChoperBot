const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const masc = new db.crearDB('mascotas', 'rpg')


module.exports = {
  name: "mascota", 
  alias: ["pets"], 
  
async execute (client, message, args){
if(!masc.tiene(`854572979353813032.${message.author.id}`)){
  masc.establecer(`854572979353813032.${message.author.id}.pets`, {nombre: "", nivel: 1, xp: 0, xpm: 200, tiempo: "", img: ""})
}
  let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
  let namem = await masc.obtener(`854572979353813032.${message.author.id}.pets.nombre`)
  let nivel = await masc.obtener(`854572979353813032.${message.author.id}.pets.nivel`)
  let xp = await masc.obtener(`854572979353813032.${message.author.id}.pets.xp`)
  let xpm = await masc.obtener(`854572979353813032.${message.author.id}.pets.xpm`)
  let tiempo = await masc.obtener(`854572979353813032.${message.author.id}.pets.tiempo`)
  let img = await masc.obtener(`854572979353813032.${message.author.id}.pets.img`)
  var a = (xp/xpm) * 100;
  var porcentaje = Math.round(a)






  const embed = new Discord.MessageEmbed()
  .setAuthor(`Mascota de ${name}`)
  .setTitle(`${namem}`)
  .setDescription(`**Nivel:** ${nivel} (${porcentaje}%)\n**XP:** ${xp}/${xpm}`)
  .setFooter(`Compañero desde ${tiempo}`)
  .setThumbnail(`${img}`)
  .setColor("RANDOM")
  message.channel.send(embed)
  

 }

} 