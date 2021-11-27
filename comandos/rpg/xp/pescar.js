const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");
module.exports = {
  name: "pescar", 
  alias: ["fish"], 
  
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
    let time = `${xx}` === '1'?150000:0;

//cd{    
   if (cooldown.has(`${message.author.id}.explorar`)) {
      
      const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
      const converted = convertMS(timeLeft); 
      
      message.channel.send(`Ya Has Pescado, Espera Unos **${converted.m}m ${converted.s}s...**`)
    return
    }
    
    cooldown.set(`${message.author.id}.explorar`, Date.now() + time); 
    cd.establecer(`854572979353813032.${message.author.id}.cooldown.pescar.tiene`, 1)
    
    setTimeout(() => {
      cooldown.delete(`${message.author.id}.explorar`);
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.pescar.tiene`, 0)
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.pescar.tiempo`, 0)
    }, time) 
    setInterval(async() =>{
      let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.pescar.tiene`)

     
      if(ml === 1){
        const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
        const converted = convertMS(timeLeft); 
        cd.establecer(`854572979353813032.${message.author.id}.cooldown.pescar.tiempo`, `${converted.m}m ${converted.s}s`)
      }
      
    }, 1000)

    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
    if(`${creado}` == 'undefined'){
      message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
      return
      
  }
//fin cd}





let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
let tiene = await inventario.obtener(`854572979353813032.${message.author.id}.cosas.caña`)
let area = await perfil.obtener(`854572979353813032.${message.author.id}.area.areas`)
if(tiene === 0){return message.channel.send(name+', Necesitas una caña de pescar.\nComprala en la tienda')}
let n = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.navegante`)
let plus;
let p
let suerte;
switch(tiene){
  case 5:
    plus = 5
    p = 4
    suerte = 25
    break
  case 4:
    plus = 3
    p = 3
    suerte = 10
    break
  case 3:
    plus = 2
    p = 0
    suerte = 5
    break
  case 2:
    plus = 1
    p = 0
    suerte = 3
    break
  case 1:
    plus = 0
    p = 0
    suerte = 1
    break
}
//area 1
if(area === '1'){

let fush = Math.floor(Math.random() * 4) + 1 + plus*n
let fish = Math.floor(Math.random() * 1) + 1 + p*n
let rollfish = Math.floor(Math.random() * 100) - suerte
if(rollfish <= 10) {
  message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?fish*2:fish} ${fish > 1?' peces dorado :tropical_fish:':' pez dorado :tropical_fish:'}**`);
  let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**🐠 Pez Dorado:** 0')}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p2}`)
  inventario.sumar(`854572979353813032.${message.author.id}.comida.pez2`, `${xx}` === '1'?fish*2:fish)
  let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p22}`)
  return 
}
message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?fush*2:fush} ${fush > 1?' peces azules :fish:':' pez azul :fish:'}**`)
let p1 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez1`)
if(p1 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**🐟 Pez Azul:** 0')}
inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**🐟 Pez Azul:** ${p1}`)
inventario.sumar(`854572979353813032.${message.author.id}.comida.pez1`, `${xx}` === '1'?fush*2:fush)
let p11 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez1`)
inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**🐟 Pez Azul:** ${p11}`)

//misiones

  let tiee = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
  let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
  if(tiee === 0){return}

  if(id === 2){
    let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    if(pr >= 5){return}
    misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, fush)
  
}
}

//area2
if(area === '2'){
 
  let fush = Math.floor(Math.random() * 6) + 1 + plus *n
  let fish = Math.floor(Math.random() * 2) + 1 + p*n
  let pez3 =  Math.floor(Math.random() * 2) + 1*n
  let rollfish = Math.floor(Math.random() * 100) - suerte
  if(rollfish <= 10) {
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez3*2:pez3} ${pez3 > 1?' peces asfur <:emoji_1:907978099436711936>':' pez asfur <:emoji_1:907978099436711936>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:emoji_1:907978099436711936> Pez Asfur:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez3`, `${xx}` === '1'?pez3*2:pez3)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p22}`)
    return 
  }else if(rollfish <= 20){
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?fish*2:fish} ${fish > 1?' peces dorado :tropical_fish:':' pez dorado :tropical_fish:'}**`);
  let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**🐠 Pez Dorado:** 0')}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p2}`)
  inventario.sumar(`854572979353813032.${message.author.id}.comida.pez2`, `${xx}` === '1'?fish*2:fish)
  let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p22}`)
  return 
  }
  message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?fush*2:fush} ${fush > 1?' peces azules :fish:':' pez azu :fish:l'}**`)
  let p1 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez1`)
  if(p1 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**🐟 Pez Azul:** 0')}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**🐟 Pez Azul:** ${p1}`)
  inventario.sumar(`854572979353813032.${message.author.id}.comida.pez1`, `${xx}` === '1'?fush*2:fush)
  let p11 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez1`)
  inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**🐟 Pez Azul:** ${p11}`)

  //misiones

  let tiee = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
  let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
  if(tiee === 0){return}

  if(id === 2){
    let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    if(pr >= 5){return}
    misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, fush)
  
}
  }
//area3
if(area === '3'){
 
  let pez1 = Math.floor(Math.random() * 6) + 1 + plus *n
  let pez2 = Math.floor(Math.random() * 2) + 1 + p*n
  let pez3 =  Math.floor(Math.random() * 2) + 1*n
  let rollfish = Math.floor(Math.random() * 100) - suerte
  if(rollfish <= 10) {
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez3*2:pez3} ${pez3 > 1?' peces chirlens <:children:908181688658563093>':' pez chirlen <:children:908181688658563093>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:children:908181688658563093> Pez Chirlen:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez3`, `${xx}` === '1'?pez3*2:pez3)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p22}`)
   
    return 
  }else if(rollfish <= 20){
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez2*2:pez2} ${pez2 > 1?' peces asfur <:emoji_1:907978099436711936>':' pez asfur <:emoji_1:907978099436711936>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:emoji_1:907978099436711936> Pez Asfur:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez3`, `${xx}` === '1'?pez2*2:pez2)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p22}`)
   
  return 
  }
  message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?fish*2:pez1} ${pez1 > 1?' peces dorado :tropical_fish:':' pez dorado :tropical_fish:'}**`);
  let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**🐠 Pez Dorado:** 0')}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p2}`)
  inventario.sumar(`854572979353813032.${message.author.id}.comida.pez2`, `${xx}` === '1'?pez1*2:pez1)
  let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez2`)
  inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**🐠 Pez Dorado:** ${p22}`)
 

  //misiones

  let tiee = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
  let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
  if(tiee === 0){return}

  if(id === 2){
    let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    if(pr >= 5){return}
    misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, fush)
  
}
}
//area4
if(area === '4'){
 
  let pez1 = Math.floor(Math.random() * 6) + 1 + plus *n
  let pez2 = Math.floor(Math.random() * 2) + 1 + p*n
  let pez3 =  Math.floor(Math.random() * 2) + 1*n
  let rollfish = Math.floor(Math.random() * 100) - suerte
  if(rollfish <= 10) {
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez3*2:pez3} ${pez3 > 1?' peces payasos <:payaso:912309933792456754>':' pez payaso <:payaso:912309933792456754>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez5`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:payaso:912309933792456754> Pez Payaso:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:payaso:912309933792456754> Pez Payaso:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez5`, `${xx}` === '1'?pez3*2:pez3)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez5`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:payaso:912309933792456754> Pez Payaso:** ${p22}`)
   
    
    return 
  }else if(rollfish <= 20){
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez2*2:pez2} ${pez2 > 1?' peces chirlens <:children:908181688658563093>':' pez chirlen <:children:908181688658563093>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:children:908181688658563093> Pez Chirlen:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez4`, `${xx}` === '1'?pez2*2:pez2)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p22}`)
   
    
  return 
  }
  message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez1*2:pez1} ${pez1 > 1?' peces asfur <:emoji_1:907978099436711936>':' pez asfur <:emoji_1:907978099436711936>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:emoji_1:907978099436711936> Pez Asfur:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez3`, `${xx}` === '1'?pez1*2:pez1)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p22}`)
   
  
 

  //misiones

  let tiee = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
  let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
  if(tiee === 0){return}

  if(id === 2){
    let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    if(pr >= 5){return}
    misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, fush)
  
}
}
//area4
if(area === '4'){
 
  let pez1 = Math.floor(Math.random() * 6) + 1 + plus *n
  let pez2 = Math.floor(Math.random() * 2) + 1 + p*n
  let pez3 =  Math.floor(Math.random() * 2) + 1*n
  let rollfish = Math.floor(Math.random() * 100) - suerte
  if(rollfish <= 10) {
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez3*2:pez3} ${pez3 > 1?' peces payasos <:payaso:912309933792456754>':' pez payaso <:payaso:912309933792456754>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez5`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:payaso:912309933792456754> Pez Payaso:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:payaso:912309933792456754> Pez Payaso:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez5`, `${xx}` === '1'?pez3*2:pez3)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez5`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:payaso:912309933792456754> Pez Payaso:** ${p22}`)
   
    
    return 
  }else if(rollfish <= 20){
    message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez2*2:pez2} ${pez2 > 1?' peces chirlens <:children:908181688658563093>':' pez chirlen <:children:908181688658563093>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:children:908181688658563093> Pez Chirlen:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez4`, `${xx}` === '1'?pez2*2:pez2)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez4`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:children:908181688658563093> Pez Chirlen:** ${p22}`)
   
    
  return 
  }
  message.channel.send(`**${name}**, atrapaste +**${`${xx}` === '1'?pez1*2:pez1} ${pez1 > 1?' peces asfur <:emoji_1:907978099436711936>':' pez asfur <:emoji_1:907978099436711936>'}**`);
    let p2 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    if(p2 === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, '**<:emoji_1:907978099436711936> Pez Asfur:** 0')}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p2}`)
    inventario.sumar(`854572979353813032.${message.author.id}.comida.pez3`, `${xx}` === '1'?pez1*2:pez1)
    let p22 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.pez3`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `**<:emoji_1:907978099436711936> Pez Asfur:** ${p22}`)
   
  
 

  //misiones

  let tiee = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
  let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
  if(tiee === 0){return}

  if(id === 2){
    let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    if(pr >= 5){return}
    misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, fush)
  
}
}

 }

} 