const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const atks = new db.crearDB('ataques', 'rpg')

const crew = new db.crearDB("crews")
const misiones = new db.crearDB('misiones', 'rpg')


module.exports = {
  name: "duel", 
  alias: [""], 
  
async execute (client, message, args){
    

        
        let author1 = message.author
        let user = message.mentions.users.first();
        if(!user) return message.reply("¡No especificó con quién le gustaría hacer el duelo!");
    
        
        if(user.id == message.author.id) return message.reply('¡no puedes hacer duelo contra ti mismo!');
    
       
        if(user.bot ==  true) return message.reply('¡No puedes hacer duelo contra un bot!');
    
        
        
    
        //los ataques
        let atydef1 = await atks.obtener(`854572979353813032.${user.id}.estadisticas.ataque`)
        let atydef2 = await atks.obtener(`854572979353813032.${message.author.id}.estadisticas.defenza`)
        
        

        message.channel.send(`${user}, ${author1} te ha desafiado a duelo. ¿Aceptas el desafío, si o no?`)
        const collect = message.channel.createMessageCollector(m => m.author.id === user.id)
        collect.on("collect", async(msg)=>{
          if(msg.content === 'si'){
            message.channel.send(`${author1}, ${user} Ha aceptado tu duelo.`)
            collect.stop()
            

            //juego
            let xx = []
            let t = [user.id, message.author.id]
            let tr = t[Math.floor(Math.random() * t.length)]
            xx.push(tr)

            
            let nombre = await perfil.obtener(`854572979353813032.${xx}.perfil.nombre`)
            let at = await perfil.obtener(`854572979353813032.${xx}.estadisticas.ataque`)
            let def = await perfil.obtener(`854572979353813032.${xx}.estadisticas.defenza`)
            const embed1 = new Discord.MessageEmbed()
            .setDescription(`**${nombre}**, Cual sera tu movimiento?\n\n1. Atacar (${at})\n2. Defender (${def})`)
            .setColor("RANDOM")
            message.channel.send(embed1)

            const juego = message.channel.createMessageCollector(m => m.author.id === `${xx}`)
            juego.on("collect", async(m)=>{
            let nm = await perfil.obtener(`854572979353813032.${xx}.perfil.nombre`)
            

              
            let nombre = await perfil.obtener(`854572979353813032.${xx}.perfil.nombre`) 
            let at = await perfil.obtener(`854572979353813032.${xx}.estadisticas.ataque`)
            let def = await perfil.obtener(`854572979353813032.${xx}.estadisticas.defenza`)
           
            let atr = Math.floor(Math.random() * at);
            let defr = Math.floor(Math.random() * def);
            let defs = []
            let dt = [];



            

            

            if(m.content === "1"){
              switch(`${xx}`){
                case `${author1.id}`:
                  xx.shift()
                  xx.push(user.id)
                  break
                case `${user.id}`:
                  xx.shift()
                  xx.push(author1.id)
                  break  
              } 
            if(dt === 1){
              
              if(defs - atr < 0){
                message.channel.send(`${nm}, ha roto el escudo de ${nombre}`)
                dt.shift()
                defs.shift()
              }
              if(defs - atr > 0){
                message.channel.send(`${nm}, no ha logrado romper el escudo de ${nombre}`)
                const embed1 = new Discord.MessageEmbed()
               .setDescription(`**${nombre}**, Cual sera tu movimiento?\n\nVida: ${vd}/${vdm}\n1. Atacar (${at})\n2. Defender (${def})`)
               .setColor("RANDOM")
               message.channel.send(embed1)
                dt.shift()
                defs.shift()
                return
              }
            }
            
             
            message.channel.send(`**${nm}**, Ha atacado a ${nombre} y le ha sacado ${dt===1?atr-defs:atr} De Vida`)
            perfil.restar(`854572979353813032.${xx}.estadisticas.vida`, dt===1?atr-defs:atr)

            let vd = await perfil.obtener(`854572979353813032.${xx}.estadisticas.vida`)
            let vdm = await perfil.obtener(`854572979353813032.${xx}.estadisticas.maxvida`)   
            if(vd < 0){
              message.channel.send(`**${nm}**, ha dejado inconciente a ${nombre}....\n🎉**${nm}** ha ganado este duelo.🎉`)
              
              juego.stop()
              return
            }        
            const embed1 = new Discord.MessageEmbed()
            .setDescription(`**${nombre}**, Cual sera tu movimiento?\n\nVida: ${vd}/${vdm}\n1. Atacar (${at})\n2. Defender (${def})`)
            .setColor("RANDOM")
            message.channel.send(embed1)
              return
            }

            if(m.content === "2"){
              switch(`${xx}`){
                case `${author1.id}`:
                  xx.shift()
                  xx.push(user.id)
                  break
                case `${user.id}`:
                  xx.shift()
                  xx.push(author1.id)
                  break  
              }
              message.channel.send(`${nm}, Genero un escudo de ${defr}`)
              .setDescription(`**${nombre}**, Cual sera tu movimiento?\n\nVida: ${vd}/${vdm}\n1. Atacar (${at})\n2. Defender (${def})`)
            .setColor("RANDOM")
            message.channel.send(embed1)
              defs.push(defr)
              dt.push(1)
            }

            })
            


          }
          if(msg.content === 'no'){
            message.channel.send(`nope`)
            collect.stop()
          }
        })

        

 }

} 
