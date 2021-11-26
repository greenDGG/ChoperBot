const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')

module.exports = {
  name: "give", 
  alias: [""], 
  
async execute (client, message, args){

    let user = message.mentions.users.first()
    let monto = args[1]
    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)


    if(!user){
        message.reply('Debes Mencionar A Alguien...')
        return
    }
    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
    }
    if(user.id == message.author.id){
        message.reply('Que Te Quieres Dar?...')
        return
    }
    if(!monto){
        message.reply('Debes Decir El Monto Que Quieres Dar...')
        return
    }
    let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
    let name2 = await perfil.obtener(`854572979353813032.${user.id}.perfil.nombre`)
    let m = Math.abs(monto)
    let m2 = await perfil.obtener(`854572979353813032.${message.author.id}.money.dinero`)
  
    if(m > m2){return message.channel.send('No puedes dar mas de lo que tienes...')}
    message.channel.send(`**${name}**, le has dado <:berri:907114454108491806>${m.toLocaleString('en-US')} a **${name2}**`)

    perfil.sumar(`854572979353813032.${user.id}.money.dinero`, m)
    perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, m)


 }

} 