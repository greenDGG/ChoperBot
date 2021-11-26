const Discord = require('discord.js');
const db = require('megadb');
const perfil = new db.crearDB("perfil", 'rpg')


const cool = new db.crearDB('cooldown', 'rpg')
const cools = new db.crearDB('csc', 'rpg')
const carcel = new db.crearDB('carcel', 'rpg') 


module.exports = {
    cdFunc:
     async (client) => {
         //cd diario
        let xx = []
        await Promise.all(
          client.guilds.cache.map(guild => {
            client.guilds.cache.get(`${guild.id}`).members.cache.map(async (member) => {
              let id = member.id;
              let tiene = await cool.obtener(`854572979353813032.${id}.cooldown.diario.tiene`)
              if(tiene === 1){
                let ak = xx.includes(id)
                if(ak === true){return}
                xx.push(id)
              const cooldown = new Discord.Collection();
              const { convertMS } = require("discordutility");
      
              let time = await cool.obtener(`854572979353813032.${id}.cooldown.diario.milis`)
              cooldown.set(`${id}.explorar`, Date.now() + time); 
              setTimeout(() => {
                cooldown.delete(`${id}.explorar`);
                cool.establecer(`854572979353813032.${id}.cooldown.diario.tiene`, 0)
                cool.establecer(`854572979353813032.${id}.cooldown.diario.tiempo`, 0)
              }, time) 
              setInterval(async() =>{
                let ml = await cool.obtener(`854572979353813032.${id}.cooldown.diario.tiene`)
              
               
                if(ml === 1){
                  const timeLeft = cooldown.get(`${id}.explorar`) - Date.now(); 
                  const converted = convertMS(timeLeft); 
                  cool.establecer(`854572979353813032.${id}.cooldown.diario.milis`, timeLeft)
              
                  cool.establecer(`854572979353813032.${id}.cooldown.diario.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
                }
                
              }, 1000)
              setInterval(async() =>{
                let ml = await cool.obtener(`854572979353813032.${id}.cooldown.diario.tiene`)
              
               
                if(ml === 1){
                  const timeLeft = cooldown.get(`${id}.explorar`) - Date.now(); 
                  const converted = convertMS(timeLeft); 
                  cools.establecer(`854572979353813032.${id}.cooldown.diario.milis`, timeLeft)
              
                  cools.establecer(`854572979353813032.${id}.cooldown.diario.tiempo`, `${converted.h}h ${converted.m}m ${converted.s}s`)
                }
                
              }, 60000)
      
      
      
              }
      
            })
          })
        )
          ///cooldown semanal
          let xs = []
          await Promise.all(
            client.guilds.cache.map(guild => {
              client.guilds.cache.get(`${guild.id}`).members.cache.map(async (member) => {
                let id = member.id;
                let tiene = await cool.obtener(`854572979353813032.${id}.cooldown.semanal.tiene`)
                if(tiene === 1){
                  let ak = xs.includes(id)
                  if(ak === true){return}
                  xs.push(id)
                const cooldown = new Discord.Collection();
                const { convertMS } = require("discordutility");
        
                let time = await cool.obtener(`854572979353813032.${id}.cooldown.semanal.milis`)
                cooldown.set(`${id}.s`, Date.now() + time); 
                setTimeout(() => {
                  cooldown.delete(`${id}.s`);
                  cool.establecer(`854572979353813032.${id}.cooldown.semanal.tiene`, 0)
                  cool.establecer(`854572979353813032.${id}.cooldown.semanal.tiempo`, 0)
                }, time) 
                setInterval(async() =>{
                  let ml = await cool.obtener(`854572979353813032.${id}.cooldown.semanal.tiene`)
                
                 
                  if(ml === 1){
                    const timeLeft = cooldown.get(`${id}.s`) - Date.now(); 
                    const converted = convertMS(timeLeft); 
                    cool.establecer(`854572979353813032.${id}.cooldown.semanal.milis`, timeLeft)
                
                    cool.establecer(`854572979353813032.${id}.cooldown.semanal.tiempo`, `${converted.d}d ${converted.h}h ${converted.m}m ${converted.s}s`)
                  }
                  
                }, 1000)
      
                setInterval(async() =>{
                  let ml = await cool.obtener(`854572979353813032.${id}.cooldown.semanal.tiene`)
                
                 
                  if(ml === 1){
                    const timeLeft = cooldown.get(`${id}.s`) - Date.now(); 
                    const converted = convertMS(timeLeft); 
                    cools.establecer(`854572979353813032.${id}.cooldown.semanal.milis`, timeLeft)
                
                    cools.establecer(`854572979353813032.${id}.cooldown.semanal.tiempo`, `${converted.d}d ${converted.h}h ${converted.m}m ${converted.s}s`)
                  }
                  
                }, 60000)
        
        
        
                }
        
              })
            })
          )

          
            ///loteria

   const lote = new db.crearDB('loteria', "loteria")
   const lotecd = new db.crearDB('cdlote', "loteria")
   
   const lotepart = new db.crearDB('participantes', "loteria")
   const { convertMS } = require("discordutility");
   let cdt = await lotecd.obtener('lote.cd')
   const cooldown = new Discord.Collection();
   cooldown.set(`loteria`, Date.now() + cdt); 
      
       setTimeout(async() => {
         lote.establecer('lote.cd', 0)
         cooldown.delete(`loteria`)
   const inventario = new db.crearDB('inventario', 'rpg')
   
               cooldown.delete(`loteria`)
               let pa = await lotepart.obtener('participantes')
               let xx = [];
               pa.forEach(async obj =>{
                 
                 if(pa != undefined){
                   let x = xx.includes(obj)
                   if(x === true){return}
                   xx.push(obj)
                   let c = await inventario.obtener(`854572979353813032.${obj}.it.boleto`)
                   inventario.extract(`854572979353813032.${obj}.inventarioi`, `🎫 **Boletos de loteria:** ${c}`)
                   inventario.restar(`854572979353813032.${obj}.cosas.ticket`, c)
   
                  
   
                 }
               })
               var par = pa[Math.floor(Math.random() * pa.length)]
               let pozo = await lote.obtener('lote.pozo')
               let name = await perfil.obtener(`854572979353813032.${par}.perfil.nombre`)
               if(par === undefined){
                 const embed = new Discord.MessageEmbed()
               .setTitle('Ganador Del La Loteria')
               .setDescription(`no hubo ganadores el dia de hoy...`)
               .setColor("GREEN")
               client.channels.cache.get("855709697817575444").send(embed)
               cooldown.set(`loteria`, Date.now() + 8.64e+7); 
               
               lote.establecer('lote.cd', 1)
   
   
               return
               }
               const embed = new Discord.MessageEmbed()
               .setTitle('Ganador Del La Loteria')
               .setDescription(`El ganador de <:berri:907114454108491806>**${pozo.toLocaleString('en-US')}** Berries es ${name}`)
               .setColor("GREEN")
               client.channels.cache.get("855709697817575444").send(embed)
               perfil.sumar(`854572979353813032.${par}.money.banco`, pozo)
               lotepart.establecer('participantes', [])
               lote.establecer('lote.pozo', 0)
               lote.establecer('lote.ultimo', `<:berri:907114454108491806>**${pozo.toLocaleString('en-US')}** - ${name}`)
               cooldown.set(`loteria`, Date.now() + 8.64e+7); 
         
         lote.establecer('lote.cd', 1)
   
       }, cdt);
       setInterval(async() => {
        
           let ml = await lote.obtener(`lote.cd`)
     
           
          
           if(ml === 1){
            
             const timeLeft = cooldown.get(`loteria`) - Date.now(); 
             lotecd.establecer(`lote.cd`, timeLeft)
           }
       }, 1000);


    }
}
