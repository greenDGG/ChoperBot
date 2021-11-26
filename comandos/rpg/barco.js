const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const crew = new db.crearDB("crews", 'rpg')

module.exports = {
  name: "barco", 
  alias: [""], 
  
async execute (client, message, args){

    const embed = new Discord.MessageEmbed()
    .setTitle('name barco')
    .setDescription('descr')
    .setThumbnail('ing')
    .setColor('')

  

 }

} 