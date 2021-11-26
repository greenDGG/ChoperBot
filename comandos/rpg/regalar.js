const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "regalar", 
  alias: [""], 
  
async execute (client, message, args){

    let usuario = message.mentions.users.first()
    let regalo = args.join(' ');
    let objeto = ["carne", "umusubi", "paleta", "mochi mochi"]
    let lacosa;
    switch (regalo){
        case 'mochi mochi':
        lacosa = 'Una La Fruta Mochi Mochi<:nani:886480414112374824>'
        break; 
        case 'carne':
            lacosa = 'Una Carne'
            break;
        case 'omusubi':
            lacosa = 'Un Omusubi'
            break;
        case 'paleta':
        lacosa = 'Una Paleta'
        break;    
    }


    

    if(!usuario){
        message.reply('Debes Mencionar A Alguien...')
        return
    }
    if(usuario.id == message.author.id){
        message.reply('Que Te Quieres Regalar?...')
        return
    }
    if(!regalo){
        message.reply('Debes Decir La Cosa Que Quieras Regalar...')
        return
    }

    
   
   
    objeto.forEach(obj => {
        
        if(regalo == obj){
          message.channel.send(`${usuario}, ${message.author} Te Ha Regalado ${lacosa}`)
          inventario.push(`${message.guild.id}.${usuario.id}.inventario`, regalo)
          return
        }
       return 
    })


 
    
    
  

 }

} 