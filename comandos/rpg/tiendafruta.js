const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "td", 
  alias: [""], 
  
async execute (client, message, args){
    let gomu = await perfil.obtener(`${message.guild.id}.${message.author.id}.equipo.fruta`)
    const embed = new Discord.MessageEmbed()
    .setDescription(`**Gomu Gomu no mi**\nEstado: Comida\nPortador: sin portador\nPrecio: 100.000.000`)
    .setImage("https://cdn.discordapp.com/attachments/862200827698216961/862211545684901948/Fruta_Gomu_Gomu.png")
    .setColor("RANDOM")

    const embed2 = new Discord.MessageEmbed()
    .setDescription("a")
    .setColor("RANDOM")
    message.channel.send(embed).then(msg => {
        if(gomu == 1){
            msg.edit(embed2)

        }
        
    })

  

 }

} 