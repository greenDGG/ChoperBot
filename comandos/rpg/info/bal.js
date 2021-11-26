const Discord = require('discord.js');
const db = require('megadb');
const rpg = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')

module.exports = {
  name: "bal", 
  alias: [""], 
  
async execute (client, message, args){

    let us = message.mentions.members.first() || message.member;
    let creado = await rpg.obtener(`854572979353813032.${us.id}.perfil`)


    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }

    let dinero = await rpg.obtener(`854572979353813032.${us.id}.money.dinero`)
    let banco = await rpg.obtener(`854572979353813032.${us.id}.money.banco`)
    let total = (dinero + banco)

    const embed = new Discord.MessageEmbed()
    .addFields(
        {
            name: "DINERO",
            value: `**Berries:** <:berri:907114454108491806> ${dinero.toLocaleString('en-US')}\n**Guardado:** <:berri:907114454108491806> ${banco.toLocaleString('en-US')}\n**Total:** <:berri:907114454108491806> ${total.toLocaleString('en-US')}`,
            inline: true
        }
    )
    .setColor("RANDOM")
  
    message.channel.send(embed)

 }

} 