const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");

const cools = new db.crearDB('csc', 'rpg')

module.exports = {
  name: "diario", 
  alias: ["daily"], 

async execute (client, message, args){
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
  let xx = [];
  
  if(weekday === 0){xx.push(1)}
  if(weekday === 6){xx.push(1)}
  let p = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)
let pp = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)

let ppp = (p - pp)


let energia =  Math.abs(ppp)
let area = await perfil.obtener(`854572979353813032.${message.author.id}.area.areas`)

let time = 8.64e+7;

    
if (cooldown.has(`${message.author.id}.explorar`)) {
  
  const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
  const converted = convertMS(timeLeft); 
  
  message.channel.send(`Ya Has Reclamado La Recompenza Diaria, Debes Esperar **${converted.h}h ${converted.m}m ${converted.s}s...**`)
return
}
//cooldown 2do
let tiene = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.tiene`)
if(tiene === 2){
    const timeLeft = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.milis`) 
  const converted = convertMS(timeLeft); 
  
  message.channel.send(`Ya Has Reclamado La Recompenza Diaria, Debes Esperar **${converted.h}h ${converted.m}m ${converted.s}s...**`)
    return
}
//hasta aqui
cooldown.set(`${message.author.id}.explorar`, Date.now() + time); 
const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.milis`, timeLeft)
cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.tiene`, 1)

setTimeout(() => {
  cooldown.delete(`${message.author.id}.explorar`);
  cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.tiene`, 0)
  cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.tiempo`, 0)
}, time) 
setInterval(async() =>{
  let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.tiene`)

 
  if(ml === 1){
    const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
    const converted = convertMS(timeLeft); 
    cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.milis`, timeLeft)

    cd.establecer(`854572979353813032.${message.author.id}.cooldown.diario.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
  }
  
}, 1000)
   
//cp
setInterval(async() =>{
  let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.diario.tiene`)

 
  if(ml === 1){
    const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
    const converted = convertMS(timeLeft); 
    cools.establecer(`854572979353813032.${message.author.id}.cooldown.diario.milis`, timeLeft)

    cools.establecer(`854572979353813032.${message.author.id}.cooldown.diario.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
  }
  
}, 60000)
//area1
//5k-15k//8k-24k
let berri1 = (Math.floor(Math.random() * 10000)) + 5000
let br2 = berri1 *2
const embed1 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#1**\n**<:berri:907114454108491806>${`${xx}` === '1'?br2.toLocaleString('en-US'):berri1.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area2let 
//20k - 30k//32k-48k
let berri2 = (Math.floor(Math.random() * 10000)) + 20000
const embed2 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#2**\n**<:berri:907114454108491806>${berri2.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area3
//30k - 40k//48k-64k
let berri3 = (Math.floor(Math.random() * 10000)) + 30000
const embed3 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#3**\n**<:berri:907114454108491806>${berri3.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area4
//50k - 70k//80k-112k
let berri4 = (Math.floor(Math.random() * 20000)) + 50000
const embed4 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#4**\n**<:berri:907114454108491806>${berri4.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area5
//70k - 85k//112k-136k
let berri5 = (Math.floor(Math.random() * 15000)) + 70000
const embed5 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#5**\n**<:berri:907114454108491806>${berri5.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area6
//90k - 100k//144k-160k
let berri6 = (Math.floor(Math.random() * 10000)) + 90000
const embed6 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#6**\n**<:berri:907114454108491806>${berri6.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)

.setColor("RANDOM")

//area7
//100k - 115k//160k-184k
let berri7 = (Math.floor(Math.random() * 15000)) + 100000

const embed7 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#7**\n**<:berri:907114454108491806>${berri7.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area8
//150k - 250k//240k-400k
let berri8 = (Math.floor(Math.random() * 100000)) + 150000
const embed8 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#8**\n**<:berri:907114454108491806>${berri8.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area9
//300k - 500k//480k-800k
let berri9 = (Math.floor(Math.random() * 200000)) + 300000

const embed9 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#9**\n**<:berri:907114454108491806>${berri9.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area10
//500k - 750k//800k-1.2m
let berri10 = (Math.floor(Math.random() * 250000)) + 500000

const embed10 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#10**\n**<:berri:907114454108491806>${berri10.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area11
//750k - 1M//1.2m-1.6m
let berri11 = (Math.floor(Math.random() * 250000)) + 750000

const embed11 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#11**\n**<:berri:907114454108491806>${berri11.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area12
//1M - 1.25M//1.6m-1.92m
let berri12 = (Math.floor(Math.random() *     250000)) + 1000000
const embed12 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#12**\n**<:berri:907114454108491806>${berri12.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area13
//1.25M - 1.5 M//1.92-2.4m
let berri13 = (Math.floor(Math.random() *     250000)) + 1250000

const embed13 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#13**\n**<:berri:907114454108491806>${berri13.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area14
//1.5M - 1.75 M//2.4m-2.8m
let berri14 = (Math.floor(Math.random() *     250000)) + 1500000

const embed14 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#14**\n**<:berri:907114454108491806>${berri14.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area15
//1.75M - 2M//2.8m-3.2m
let berri15 = (Math.floor(Math.random() *     250000)) + 1750000

const embed15 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#15**\n**<:berri:907114454108491806>${berri15.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area16
//2M - 2.5 M//3.2m-4m
let berri16 = (Math.floor(Math.random() *     500000)) + 2000000

const embed16 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#16**\n**<:berri:907114454108491806>${berri16.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area17
//2.5M - 3 M//4m-4.8m
let berri17 = (Math.floor(Math.random() *     500000)) + 2500000

const embed17 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#17**\n**<:berri:907114454108491806>${berri17.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area18
//3M - 4let M//4.8m-6.4m
let berri18 = (Math.floor(Math.random() *     1000000)) + 3000000

const embed18 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#18**\n**<:berri:907114454108491806>${berri18.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area19
//4M - 5let M//6.4m-8m
let berri19 = (Math.floor(Math.random() *     1000000)) + 4000000

const embed19 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#19**\n**<:berri:907114454108491806>${berri19.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

//area20
//5M - 6.5let M//8m-10.4m
let berri20 = (Math.floor(Math.random() *     1500000)) + 5000000

const embed20 = new Discord.MessageEmbed()
.setAuthor(`Recompensa Diaria`)
.setDescription(`Recompensas Area **#20**\n**<:berri:907114454108491806>${berri20.toLocaleString('en-US')} Berris\n⚡${energia} Energias**`)
.setColor("RANDOM")

perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.energia`, energia)

if(area === '20'){
    message.channel.send(embed20) 
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri20)
}
else if(area === '19'){
    message.channel.send(embed19)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri19)

    
}
else if(area === '18'){
    message.channel.send(embed18)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri18)

    
}
else if(area === '17'){
    message.channel.send(embed17)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri17)

    
}
else if(area === '16'){
    message.channel.send(embed16)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri16)

   
}
else if(area === '15'){
    message.channel.send(embed15)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri15)

    
}
else if(area === '14'){
    message.channel.send(embed14)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri14)

   
}
else if(area === '13'){
    message.channel.send(embed13)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri13)


}
else if(area === '12'){
    message.channel.send(embed12)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri12)


}
else if(area === '11'){
    message.channel.send(embed11)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri11)


}
else if(area === '10'){
    message.channel.send(embed10)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri10)


}
else if(area === '9'){
message.channel.send(embed9)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri9)

    
}
else if(area === '8'){
message.channel.send(embed8)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri8)

    
}
else if(area === '7'){
message.channel.send(embed7)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri7)

    
}
else if(area === '6'){
message.channel.send(embed6)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri6)

    
}
else if(area === '5'){
message.channel.send(embed5)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri5)

    
}
else if(area === '4'){
message.channel.send(embed4)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri4)

    
}
else if(area === '3'){
message.channel.send(embed3)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri3)

    
}
else if(area === '2'){
message.channel.send(embed2)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri2)

    
}
else if(area === '1'){
message.channel.send(embed1)
perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, berri1)

    
}



}}