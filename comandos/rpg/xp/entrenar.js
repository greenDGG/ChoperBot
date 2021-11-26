const Discord = require('discord.js');
const db = require("megadb")
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const entrenar = new db.crearDB('entrenar', 'rpg')


module.exports = {
  name: "entrenar", 
  alias: ["ent"], 
  
async execute (client, message, args){
  let time = 4.32e+7;
  //cd{    
    if (cooldown.has(`${message.author.id}.explorar`)) {
      
      const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
      const converted = convertMS(timeLeft); 
      
      message.channel.send(`Ya Has Entrenado, Espera Unas **${converted.h}h ${converted.m}m ${converted.s}s...**`)
    return
    }
    
    cooldown.set(`${message.author.id}.explorar`, Date.now() + time); 
    cd.establecer(`854572979353813032.${message.author.id}.cooldown.entrenar.tiene`, 1)
    
    setTimeout(() => {
      cooldown.delete(`${message.author.id}.explorar`);
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.entrenar.tiene`, 0)
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.entrenar.tiempo`, 0)
    }, time) 
    setInterval(async() =>{
      let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.entrenar.tiene`)
  
     
      if(ml === 1){
        const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
        const converted = convertMS(timeLeft); 
        cd.establecer(`854572979353813032.${message.author.id}.cooldown.entrenar.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
      }
      
    }, 1000)
    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
  
    if(`${creado}` == 'undefined'){
      message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
      return
      
  }
  //fin cd}






if(!entrenar.tiene(`854572979353813032.${message.author.id}`)){
entrenar.establecer(`854572979353813032.${message.author.id}`, {puntos: 0})
}
let nombre = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
let puntos = Math.floor(Math.random() * 2)+ 1
let energia = Math.floor(Math.random() * 5)+5

const embed = new Discord.MessageEmbed()
.setDescription(`**${nombre}** A Entrenado.\nGanó <:puntosop:911040434510397510>${puntos===1?`**${puntos}** punto`:`**${puntos}** puntos`} ∅P\nGastó ⚡${energia} de Energia`)
.setColor("GREEN")
message.channel.send(embed)

perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, energia)
entrenar.sumar(`854572979353813032.${message.author.id}.puntos`, puntos)
  

 }

} 