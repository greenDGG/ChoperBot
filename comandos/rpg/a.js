const Discord = require('discord.js')
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
//let cooldown = new Set();
const crew = new db.crearDB("crews", 'rpg')
const comida = new db.crearDB("comida", 'rpg')



const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");


module.exports = {
  name: "a", 
  alias: [""], 
  
async execute (client, message, args){
 
  return
  const fecha = new Date()
  const hoy = fecha.getDate()
  const añoActual = fecha.getFullYear();
  const mesActual = fecha.getMonth()
  let ma;
  switch(mesActual){
    
    case 0:
      ma = 'January'
      break;
    case 1:
      ma = 'February'
      break;
    case 2:
      ma = 'March'
      break;
    
    case 3:
      ma = 'April'
      break;
    case 4:
      ma = 'May'
      break;
    case 5:
      ma = 'June'
      break;
    case 6:
      ma = 'July'
      break;
    case 7:
      ma = 'August'
      break;
    case 8:
      ma = 'September'
      break;
    case 9:
      ma = 'October'
      break;
    case 10:
      ma = 'November'
      break;
    case 11:
      ma = 'December'
      break;
    
  }
  var Xmas95 = new Date(`${ma} ${hoy}, ${añoActual} 12:15:30`);
  var weekday = Xmas95.getDay();
  let dia;
  switch(weekday){
    case 6:
      dia = 'Sabado'
      break;
    case 5:
      dia = 'Viernes'
      break;
    case 4:
      dia = 'Jueves'
      break;
    case 3:
      dia = 'Miercoles'
      break;
    case 2:
      dia = 'Martes'
      break;
    
    case 1:
      dia = 'Lunes'
      break;
    case 0:
      dia = 'Domingo'
      break;
  }

console.log(dia); // 1


  



  return 
  let usi = message.mentions.members.first()


  cool.establecer(`854572979353813032.${usi.id}.cooldown`, {diario: {tiene: 0, tiempo: 0, milis:0}, semanal: {tiene: 0, tiempo: 0, milis:0}, explorar: {tiene: 0, tiempo: 0, milis:0}, zarpar: {tiene: 0, tiempo: 0, milis:0}, pescar: {tiene: 0, tiempo: 0, milis:0}, entrenar:{tiene: 0, tiempo: 0, milis:0}})


  return
  let asas = args.join(' ')
  let va = await comida.obtener(`comida.${asas}.valor`)
  let vida = await comida.obtener(`comida.${asas}.vida`)

 
console.log(`${va} valor\n${vida} vida`)
  message.channel.send(`${va} valor\n${vida} vida`)
  return
  comida.establecer(`comida`,{carne: {valor: 100,vida: 40}, manzana: {valor: 10000,vida: 1000}})
  return
  let hak = Math.floor(Math.random() * 100)

  
  let us = message.mentions.members.first()
  let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)

  let aas = await crew.obtener(`854572979353813032.${id}.tripulacion.alianza.aliaid`)
            

  aas.forEach(async(obj) =>{
    let xx = [];
    let j = await crew.obtener(`854572979353813032.${obj}.tripulacion.nombre`)
    xx.push({ ID: name, data: obj })
    let xy = xx.sort((a, b) => b.data - a.data);
        
            var final = "";
            for (var i in xy) {
                
                let ind = xy.indexOf(xy[i]) + 1;
                
    
                final += `**${xy[i].data.toLocaleString('en-US')}** -- ${xy[i].ID}\n`
            } 
    message.channel.send(final)
  })
  return
  let aaa = args.join(' ')
  console.log(aaa.length)
   
  return
  if(hak <= 3){
    perfil.establecer(`854572979353813032.${us.id}.perfil.haki3`, 1)
  }
  console.log(hak)
  return
  message.channel.send(`Estoy En: ${client.guilds.cache.size.toLocaleString()} Sevidores`)
  return 
 
  let economia = new db.crearDB('guild_4', 'economia_db');
 
  
 economia.ordenar('servidores.datos', false) 
 let a = await economia.obtener('servidores.datos') 
 message.channel.send(`${a}`)

return
  cool.establecer(`854572979353813032.${us.id}.cooldown`, {diario: 0, dia: 0, semanal: 0, sema: 0, explorar: 0, exp: 0, zarpar: 0, za: 0})


  
  inventario.establecer(`${message.guild.id}.${us.id}`, {item: 0, com: 0})
  inventario.establecer(`${message.guild.id}.${us.id}.comida`, {omusubi: 0, paleta: 0, carne: 0, gomitas: 0, sushi: 0})
      inventario.establecer(`${message.guild.id}.${us.id}.frutas`, {bara: 0, sube: 0, bomu: 0, kiro: 0, hana: 0, moku: 0, bato: 0, ope: 0, kage: 0, mera: 0, tori1: 0, sara1: 0})
      
      inventario.establecer(`${message.guild.id}.${us.id}.cofres`, {comun: 0, raro: 0, epico: 0, hyper: 0, legendary: 0})
      inventario.establecer(`${message.guild.id}.${us.id}.armas`, {})
      inventario.establecer(`${message.guild.id}.${us.id}.inventarioi`, [''])
      inventario.establecer(`${message.guild.id}.${us.id}.inventarioc`, [])

return
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){
        //something
    }
}
        

        
function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
    message.channel.send(`es una imagen \n${url}`)
    return
}

message.channel.send('no hay imagen')

  return
  
let time = 60000;

    
    if (cooldown.has(message.author.id)) {
      
      const timeLeft = cooldown.get(message.author.id) - Date.now(); 
      const converted = convertMS(timeLeft); 
      
      message.channel.send(`Tienes un cooldown de ${converted.m}m ${converted.s}s`)
    return
    }
    
    cooldown.set(message.author.id, Date.now() + time); 
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, time) 
  

 
  message.channel.send('Se aplico un cooldown de 60 segundos')

  return
  let c = await cool.obtener(`${message.guild.id}.${message.author.id}.cooldown.explorar`)
  
  if((c) > '0'){
    message.channel.send(`${message.author}, Debe esperar 30s antes de volver a usar este comando.`)
  
    return;
  }
  
  cool.establecer(`${message.guild.id}.${message.author.id}.cooldown.explorar`, 30)
  cooldown.add(message.author.id)
  
  setTimeout(() => {
    setInterval(() => {
    
      cool.restar(`${message.guild.id}.${message.author.id}.cooldown.explorar`, 1);
      
    }, 1000);
  
    cooldown.delete(message.author.id);
    
  }, 30000);
  

         
      
  
  
  
  message.channel.send("se aplico un cooldown de 30 segundos")


  return

cool.establecer(`${message.guild.id}.${message.author.id}.cooldown`, {explorar: 0, daily: 0, weekly: 0})



  return


  let i = await inventario.obtener(`${message.guild.id}.${message.author.id}.inventarioi`)
  message.channel.send(`${i.join('\n').filter}`)
  return
 inventario.establecer(`${message.guild.id}.${message.author.id}`, {item: 0, com: 0})
  inventario.establecer(`${message.guild.id}.${message.author.id}.comida`, {omusubi: 0, paleta: 0, carne: 0, gomitas: 0, sushi: 0})
      inventario.establecer(`${message.guild.id}.${message.author.id}.frutas`, {bara: 0, sube: 0, bomu: 0, kiro: 0, hana: 0, moku: 0, bato: 0, ope: 0, kage: 0, mera: 0, tori1: 0, sara1: 0})
      
      inventario.establecer(`${message.guild.id}.${message.author.id}.cofres`, {comun: 0, raro: 0, epico: 0, hyper: 0, legendary: 0})
      inventario.establecer(`${message.guild.id}.${message.author.id}.armas`, {})
      inventario.establecer(`${message.guild.id}.${message.author.id}.inventarioi`, [])
      inventario.establecer(`${message.guild.id}.${message.author.id}.inventarioc`, [])
      

 }

} 