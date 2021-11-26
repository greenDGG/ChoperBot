const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "ruleta", 
  alias: ["roullete", 'rt'], 
  
async execute (client, message, args){

  
    
 let n = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.navegante`)
  let user = message.author; 
  let mor2 = args[0];
  let mor = Math.abs(mor2)
  let gan = mor * 2*n; 

 const din = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription("Debes poner una cantidad de dinero para apostar.\nEl mínimo de dinero para apostar es de **100**")
  .setColor("RED")

 if(!mor) return message.channel.send(din) 
 
const minimo = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription("No puedes apostar menos de **100**")
  .setColor("RED")

  if(mor <= 99) return message.channel.send(minimo)

 

   let money = await perfil.obtener(`854572979353813032.${message.author.id}.money.dinero`);

  if(isNaN(mor)){
      const nonum = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`Solo puedes apostar dinero.`)
      .setColor("RED")
      message.channel.send(nonum)

      return; 
  }

  if(mor > money){
      const nomo = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription("No tienes suficiente dinero.")
      .setColor("RED")
      message.channel.send(nomo)

      return; 
} 

  let co = args[1]; 
 
if(!co){ 
const color = new Discord.MessageEmbed()
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription("Debes elegir un color entre `rojo` o `negro`") 
.setColor("RED")

message.channel.send(color) 
}
 else if(co === "rojo" || co === "negro"){ 
 var cro = ["negro","rojo"] //ponemos las opciones en una variable
 var cros = Math.floor(Math.random()*(cro.length)); //hacemos un math.random entre las 2 opciones
 var crosi = cro[cros]
 if(crosi === "rojo"){ 
if(co === "rojo"){ //acá ponemos lo que va a hacer el bot en el caso de que salga rojo

  perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, mor)
  perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, gan) //si salió rojo le sumará el dinero que el usuario apostó a su dinero actual

  const ganaste = new Discord.MessageEmbed() //creamos un embed
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`La bola cayó en el color 🔴**rojo**🔴\n\nDinero ganado: <:berri:907114454108491806>**${gan.toLocaleString('en-US')}**`)//le decimos al usuario que salió rojo y el dinero que ganó, para esto lo multiplicamos al principio
  .setColor("#FFFDFD")

return message.channel.send(`<@${message.author.id}>`), message.channel.send(ganaste)//acá mencionamos al usuario y enviamos el embed
}

//acá cruzan los embed, así que esto sería lo que pasaría en el caso de que el usuario elija negro y salga rojo.

 
   perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, mor) //le restamos el dinero que el dinero que el usuario apostó

const perdiste = new Discord.MessageEmbed() //cremos otro embed
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`La bola cayó en el color 🔴**rojo**🔴\n\nDinero perdido: <:berri:907114454108491806>**${mor.toLocaleString('en-US')}**`) //le decimo que salió rojo y el dinero que perdió
.setColor("RED")

message.channel.send(perdiste) //enviamos el embed

return; //retornamos para ahorrarnos errores
}
  
if(crosi === "negro"){
if(co === "negro"){ //acá ponemos lo que va a hacer el bot en el caso de que salga negro

  perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, mor)
  
   perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, gan)

  const ganaste2 = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`La bola cayó en el color ⚫**negro**⚫\n\nDinero ganado: <:berri:907114454108491806>**${gan.toLocaleString('en-US')}**`)
  .setColor("#FFFDFD")
  
return message.channel.send(ganaste2)  //acá es lo mismo que con el rojo, no me voy a poner a explicarlo todo otra vez
}

//acá como dije antes, se cruzan los embed, así que esto sería lo que pasaría en el caso de que el usario elija rojo y salga negro

 
   perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, mor)


const perdiste2 = new Discord.MessageEmbed()
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`La bola cayó en el color ⚫**negro**⚫\n\nDinero perdido: <:berri:907114454108491806>**${mor.toLocaleString('en-US')}**`)
.setColor("RED")

message.channel.send(perdiste2)

return;
}

}
  else {  
    const solop = new Discord.MessageEmbed()
    .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
    .setDescription("Solo puedes poner `rojo` o `negro`.")
    .setColor("RED")

    message.channel.send(solop) 

}

 }

} 