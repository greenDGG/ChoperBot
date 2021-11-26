const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const crew = new db.crearDB("crews", 'rpg')

module.exports = {
  name: "info", 
  alias: [""], 
  
async execute (client, message, args){
let info = args.join(' ')
if(!info) return message.channel.send('De que quieres que te de info?')

  

 }

}