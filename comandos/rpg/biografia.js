const Discord = require('discord.js');
const db = require('megadb');
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "add-bio", 
  alias: ["añadir-bio", "biografia"], 

execute (client, message, args){
    let bio = args.join(' ')

    if(!bio){
        message.channel.send('Nesecitas escribir una biografia para establecer.')
        return
    }
    if(bio.length > 1000){

        message.channel.send(`Has Superado El Limite de caracteres **1000**\nHas Escrito ${bio.length} caracteres.`)
        return
    }
   
    perfil.establecer(`854572979353813032.${message.author.id}.perfil.bio`, `${bio}`)
    message.channel.send("Biografia Establecida Con Exito.")

 }

} 
