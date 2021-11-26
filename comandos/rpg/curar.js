const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "curar", 
  alias: [""], 
  
async execute (client, message, args){
    let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)

    let mension = message.mentions.users.first()
    let name2 = await perfil.obtener(`854572979353813032.${mension.id}.perfil.nombre`)
    let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
    
    if(rol !== "<:SimboloHospital:901623144631128135> Doctor"){
        message.channel.send('Solo los que tienen rol de doctor pueden usar este comando...')
        return
    }
    if(!mension){
        message.channel.send('Debes mencionar a una persona para curar...')
        return
    }
    let maxv = await perfil.obtener(`854572979353813032.${mension.id}.estadisticas.maxvida`)
    let v = await perfil.obtener(`854572979353813032.${mension.id}.estadisticas.vida`)
    if(v === maxv){
        message.channel.send("Este Usuario Esta De 10")
        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${name}**, Ha <:SimboloHospital:901623144631128135> Curado A **${name2}**`)
    .setColor("RANDOM")
    message.channel.send(embed)
    
    perfil.establecer(`854572979353813032.${mension.id}.estadisticas.vida`, maxv)
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, 5)


  

 }

} 