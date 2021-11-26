const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "rob", 
  alias: ["robar"], 
  
async execute (client, message, args){
    
    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
    const user = message.author;
    let mencion = message.mentions.members.first();
    let crm = await perfil.obtener(`854572979353813032.${message.mentions.members.firstKey()}.perfil`)
    let a1 = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)
    let a2 = await perfil.obtener(`854572979353813032.${message.mentions.members.firstKey()}.estadisticas.ataque`)
    let n1 = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
    let n2 = await perfil.obtener(`854572979353813032.${message.mentions.members.firstKey()}.perfil.nombre`)
    let m = await perfil.obtener(`854572979353813032.${message.mentions.members.firstKey()}.money.dinero`)



    let por = (a1/a2) * 100 / 2 
    let pr = (Math.floor(Math.random() * por)) + 1
    let a = (Math.floor(Math.random() * a2))



    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }
    

    if(!mencion){
        message.channel.send("Menciona a la persona que quieres robar")
        return
    
    }
    if(`${crm}` == 'undefined'){
        message.channel.send('El usuario que mencionaste no tiene un perfil...')
        return
        
    }
    if( message.mentions.members.firstKey() === message.author.id){
        message.reply("No te puedes robar a ti mismo....")
        return
    }
    //sin dinero
    if(m === 0){
        return message.channel.send(`mmm que lastima **${n1}**, parece que **${n2}** no trae dinero consigo`)
    }

    //no tiene suficiente at
    if(`${pr}` === `NaN`){return message.channel.send(`**${n1}** hubo un error intendalo de nuevo...`)}
    //no roba nd
    if(pr < 10){
        let mm = (m / 2)
        message.channel.send(`**${n1}**, le a intentado robar a **${n2}** pero fallo\n**${n2}** se dio cuenta y le saco **${a}** ❤️ de vida y <:berri:907114454108491806>**${mm.toLocaleString('en-US')}** berries`)
        perfil.sumar(`854572979353813032.${message.mentions.members.firstKey()}.money.dinero`, mm)
        perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, mm)

        perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, a)
        return
    }
    //robar td
    if(pr > 100){
        message.channel.send(`**${n1}**, le ha robado <:berri:907114454108491806>**${m.toLocaleString('en-US')}** Berries a **${n2}**`)
        perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, m)
        perfil.restar(`854572979353813032.${message.mentions.members.firstKey()}.money.dinero`, m)

        return
    }
    //robo normal
    let mr = (m / 100) * pr
    let mrr = Math.round(mr)
    message.channel.send(`**${n1}** le has robado <:berri:907114454108491806>**${mrr.toLocaleString('en-US')}** a **${n2}**`)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, mrr)
    perfil.restar(`854572979353813032.${message.mentions.members.firstKey()}.money.dinero`, mrr)


  

 }

} 