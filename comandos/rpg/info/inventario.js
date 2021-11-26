const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')


module.exports = {
  name: "inventario", 
  alias: ["i"], 
  
async execute (client, message, args){
    let us = message.mentions.members.first() || message.member;
    let creado = await perfil.obtener(`854572979353813032.${us.id}.perfil`)
    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return}

       
        let i = await inventario.obtener(`854572979353813032.${us.id}.inventarioi`)
       
        let c = await inventario.obtener(`854572979353813032.${us.id}.inventarioc`)
        
       

    const embed = new Discord.MessageEmbed()
    .addFields(
        {
            name: "Items",
            value: `${i.join('\n')}`,
            inline: true
        },
        {
            name: "Comidas",
            value: `${c.join('\n')}`,
            inline: true
        },
        
    )
    .setColor("RANDOM")
    .setAuthor(`${await perfil.obtener(`854572979353813032.${us.id}.perfil.nombre`)} Inventario`, us.user.displayAvatarURL())
    message.channel.send(embed)

    

}
}