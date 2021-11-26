const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");
const cd = new db.crearDB("cooldown", 'rpg')

module.exports = {
  name: "mision", 
  alias: [""], 
  
async execute (client, message, args){
    if (cooldown.has(`${message.author.id}.explorar`)) {
           
        const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
        const converted = convertMS(timeLeft); 
        
        message.channel.send(`Ya Has Hecho Una Mision, Espera Unas **${converted.h}h ${converted.m}m ${converted.s}s...**`)
      return
      }

    if(!misiones.tiene(`854572979353813032.${message.author.id}.misiones`)){
        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 0, idm: 0, pr: 0, prm: 0, recomd: 0, recomxp: 0})
    }
//#area1
var nmis1 = [1,2,3,4]
let mr1 = nmis1[Math.floor(Math.random() * nmis1.length)]
let misio1;
let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
let ls = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
let la = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.prm`)

switch(mr1){
    case 1:
        misio1 = "Explora **`La Selva`** 2 veces\nRecompensa De Mision\n**<:berri:907114454108491806> 5,000 Berris y 100XP**\n¿Deseas aceptar? `si|no`"
       

        break;
    case 2:
        misio1 = "Pescar **`5 Pescados`🐟 Azules**\nRecompensa De Mision\n**<:berri:907114454108491806> 5,000 Berris y 100XP**\n¿Deseas aceptar? `si|no`"
      


        break;
    case 3:
        misio1 = "Ir a `Zarpar` 3 Veces\nRecompensa De Mision\n**<:berri:907114454108491806> 5,000 Berris y 100XP**\n¿Deseas aceptar? `si|no`"
       


        break;
    case 4:
        misio1 = "Ten un **`duelo`**\nRecompensa De Mision\n**<:berri:907114454108491806> 5,000 Berris y 100XP**\n¿Deseas aceptar? `si|no`"
        


        break;
    case 5:
        misio1 = ""
        break;
    case 6:
        misio1 = ""
        break;
    case 7:
        misio1 = ""
        break;
    case 8:
        misio1 = ""
        break;
    case 9:
        misio1 = ""
        break;

}

if(tiene === 1){
    if(ls >= la){
        //cd
        let time = 1.08e+7;

    
        
         
         cooldown.set(`${message.author.id}.explorar`, Date.now() + time); 
         cd.establecer(`854572979353813032.${message.author.id}.cooldown.mision.tiene`, 1)
         
         setTimeout(() => {
           cooldown.delete(`${message.author.id}.explorar`);
           cd.establecer(`854572979353813032.${message.author.id}.cooldown.mision.tiene`, 0)
           cd.establecer(`854572979353813032.${message.author.id}.cooldown.mision.tiempo`, 0)
         }, time) 
         setInterval(async() =>{
           let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.mision.tiene`)
     
          
           if(ml === 1){
             const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
             const converted = convertMS(timeLeft); 
             cd.establecer(`854572979353813032.${message.author.id}.cooldown.mision.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
           }
           
         }, 1000)
        //tcd
        let xp = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.recomxp`)
        let mon = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.recomd`)
    
        const embed = new Discord.MessageEmbed()
        .setTitle('Mision Completada')
        .setDescription(`Ten tu Recompenza\n<:berri:907114454108491806>**${mon} Berris y ${xp}XP**`)
        .setColor('RANDOM')
        message.channel.send(embed)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
        perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, mon)
    
        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 0, idm: 0, pr: 0, prm: 0, recomd: 0, recomxp: 0})
        return
    }
    let ms = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
    let ll = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
    let msi;
    let pro;
    switch(ms){
        case 1:
            msi = "Explora **`La Selva`** 2 veces"
            pro = `${ll}/2`
            break;
        case 2:
            msi = "Pescar **`5 Pescados`🐟 Azules**"
            pro = `${ll}/5`
            break;
        case 3:
            msi = "Ir a `Zarpar` 3 Veces"
            pro = `${ll}/3`
            break;
        case 4:
            msi = "Tener un **`duelo`**"
            pro = `${ll}/1`

            break;
        case 5:
            msi = ""
            break;
        case 6:
            msi = ""
            break;
        case 7:
            msi = ""
            break;
        case 8:
            msi = ""
            break;
        case 9:
            msi = ""
            break;
    
    }
    const embe1 = new Discord.MessageEmbed()
.setTitle('Progreso de Mision')
.setDescription(`Mision: ${msi}\nProgreso: ${pro}`)
.setColor("RANDOM")
message.channel.send(embe1)
return
}

const embed = new Discord.MessageEmbed()
.setTitle('Mision Area #1')
.setDescription(`${misio1}`)
.setColor("RANDOM")
message.channel.send(embed)

const colector = message.channel.createMessageCollector(m => m.author.id === message.author.id)
        
        colector.on('collect', async(msg) => {
            if(msg.content == "si"){
                let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)

                message.channel.send(`**${name}**, Tiene una Nueva Mision.`)
                switch(mr1){
                    case 1:
                        
                        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 1, idm: 1,pr:0, prm: 2, recomd: 5000, recomxp: 100})


                
                        break;
                    case 2:
                        
                        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 1, idm: 2,pr:0, prm: 5, recomd: 5000, recomxp: 100})

                
                
                        break;
                    case 3:
                        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 1, idm: 3,pr:0, prm: 3, recomd: 5000, recomxp: 100})

                
                
                        break;
                    case 4:
                        misiones.establecer(`854572979353813032.${message.author.id}.misiones`, {tiene: 1, idm: 4,pr:0, prm: 1, recomd: 5000, recomxp: 100})

                
                
                        break;
                    case 5:
                        misio1 = ""
                        break;
                    case 6:
                        misio1 = ""
                        break;
                    case 7:
                        misio1 = ""
                        break;
                    case 8:
                        misio1 = ""
                        break;
                    case 9:
                        misio1 = ""
                        break;
                
                }
                colector.stop();
                return
            }
            if(msg.content == "no"){
                msg.channel.send(`:)`)
                colector.stop(); 
                return
            }
        })
  

 }

} 