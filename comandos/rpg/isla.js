const Discord = require('discord.js');
const db = require('megadb');
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')

module.exports = {
  name: "isla", 
  alias: [""], 

async execute (client, message, args){

    let area = args[0]
    let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
    let capi = await crew.obtener(`854572979353813032.${id}.tripulacion.owner`)
    if(capi != message.author.id) return message.channel.send('Solo el capitan de un crew puede usar este comando')
    if(!area) return message.channel.send(`**${message.author.username}**, ¿A que isla quieres ir?\n` + "Uso correcto: `op!isla [número de área]`")
    if(isNaN(area)) return message.channel.send(`**${message.author.username}**, ¿A que isla quieres ir?\n` + "Uso correcto: `op!isla [número de área]`")
    if(area > 20) return message.channel.send(`**${message.author.username}**, ¿A que isla quieres ir?\n` + "Uso correcto: `op!isla [número de área]``")


    let areas = await perfil.obtener(`854572979353813032.${message.author.id}.area.areas`)
    if((areas) == area) return message.channel.send(`**${message.author.username}**, ya estás en esta isla`)

    let at = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)
    let def = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.defenza`)
    let ba = await perfil.obtener(`854572979353813032.${message.author.id}.equipo.barco`)

    let cre = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)
    

    let atcrw = await crew.obtener(`854572979353813032.${id}.tripulacion.estad.at`) 
    let defcrw = await crew.obtener(`854572979353813032.${id}.tripulacion.estad.def`)
    let naka = await crew.obtener(`854572979353813032.${id}.tripulacion.jugadores`)

    let atm = (at + def)
    let atc = (atcrw + defcrw)


    let cr;
    switch(cre){
        case 0:
            cr = `${atm}`
            break;
        case 1:
            cr = `${atc}`
            break;
    }
 
    let re;
    switch(area){
        case '20':
            re = `${at >= 1200?'✅ | ':'❌ | '}`+'1200 de AT\n'+`${def >= 1200?'✅ | ':'❌ | '}`+'1200 de DEF\n'+`${cr >= 28800?'✅ | ':'❌ | '}`+'28.800 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-20 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 19?'✅ | ':'❌ | '}`+'Estar en la isla #19'
            break;
        case '19':
            re = `${at >= 910?'✅ | ':'❌ | '}`+'910 de AT\n'+`${def >= 910?'✅ | ':'❌ | '}`+'910 de DEF\n'+`${cr >= 18200?'✅ | ':'❌ | '}`+'18.200 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-20 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 18?'✅ | ':'❌ | '}`+'Estar en la isla #18'
            break;
        case '18':
            re = `${at >= 760?'✅ | ':'❌ | '}`+'760 de AT\n'+`${def >= 760?'✅ | ':'❌ | '}`+'760 de DEF\n'+`${cr >= 15200?'✅ | ':'❌ | '}`+'15.200 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-20 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 17?'✅ | ':'❌ | '}`+'Estar en la isla #17'
            break;
        case '17':
            re = `${at >= 640?'✅ | ':'❌ | '}`+'640 de AT\n'+`${def >= 640?'✅ | ':'❌ | '}`+'640 de DEF\n'+`${cr >= 11520?'✅ | ':'❌ | '}`+'11.520 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-15 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 16?'✅ | ':'❌ | '}`+'Estar en la isla #16'
            break;
        case '16':
            re = `${at >= 560?'✅ | ':'❌ | '}`+'560 de AT\n'+`${def >= 560?'✅ | ':'❌ | '}`+'560 de DEF\n'+`${cr >= 40?'✅ | ':'❌ | '}`+'10.080 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 15?'✅ | ':'❌ | '}`+'Estar en la isla #15'
            break;
        case '15':
            re = `${at >= 480?'✅ | ':'❌ | '}`+'480 de AT\n'+`${def >= 480?'✅ | ':'❌ | '}`+'480 de DEF\n'+`${cr >= 8640?'✅ | ':'❌ | '}`+'8640 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n80% de Suministros\nUn Logs\n'+`${areas > 14?'✅ | ':'❌ | '}`+'Estar en la isla #14'
            break;
        case '14':
            re = `${at >= 400?'✅ | ':'❌ | '}`+'400 de AT\n'+`${def >= 400?'✅ | ':'❌ | '}`+'400 de DEF\n'+`${cr >= 7200?'✅ | ':'❌ | '}`+'7200 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 13?'✅ | ':'❌ | '}`+'Estar en la isla #13'
            break;
        case '13':
            re = `${at >= 340?'✅ | ':'❌ | '}`+'340 de AT\n'+`${def >= 340?'✅ | ':'❌ | '}`+'340 de DEF\n'+`${cr >= 6120?'✅ | ':'❌ | '}`+'6120 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 12?'✅ | ':'❌ | '}`+'Estar en la isla #12'
            break;
        case '12':
            re = `${at >= 280?'✅ | ':'❌ | '}`+'280 de AT\n'+`${def >= 280?'✅ | ':'❌ | '}`+'280 de DEF\n'+`${cr >= 4480?'✅ | ':'❌ | '}`+'4480 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 11?'✅ | ':'❌ | '}`+'Estar en la isla #11'
            break;
        case '11':
            re = `${at >= 220?'✅ | ':'❌ | '}`+'220 de AT\n'+`${def >= 220?'✅ | ':'❌ | '}`+'220 de DEF\n'+`${cr >= 3520?'✅ | ':'❌ | '}`+'3520 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 10?'✅ | ':'❌ | '}`+'Estar en la isla #10'
            break;
        case '10':
            re = `${at >= 200?'✅ | ':'❌ | '}`+'200 de AT\n'+`${def >= 200?'✅ | ':'❌ | '}`+'200 de DEF\n'+`${cr >= 3200?'✅ | ':'❌ | '}`+'3200 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 9?'✅ | ':'❌ | '}`+'Estar en la isla #9'
            break;
        case '9':
            re = `${at >= 150?'✅ | ':'❌ | '}`+'150 de AT\n'+`${def >= 150?'✅ | ':'❌ | '}`+'150 de DEF\n'+`${cr >= 2400?'✅ | ':'❌ | '}`+'2400 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n '+`${naka > 5?'✅ | ':'❌ | '}`+'5-10 Nakamas\n70% de Suministros\nUn Logs\n'+`${areas > 8?'✅ | ':'❌ | '}`+'Estar en la isla #8'
            break;
        case '8':
            re = `${at >= 120?'✅ | ':'❌ | '}`+'120 de AT\n'+`${def >= 120?'✅ | ':'❌ | '}`+'120 de DEF\n'+`${cr >= 1680?'✅ | ':'❌ | '}`+'1680 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 4?'✅ | ':'❌ | '}`+' 4-8 Nakamas\n60% de Suministros\nUn Logs\n'+`${areas > 7?'✅ | ':'❌ | '}`+'Estar en la isla #7'
            break;
        case '7':
            re = `${at >= 100?'✅ | ':'❌ | '}`+'100 de AT\n'+`${def >= 100?'✅ | ':'❌ | '}`+'100 de DEF\n'+`${cr >= 1000?'✅ | ':'❌ | '}`+'1000 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 4?'✅ | ':'❌ | '}`+' 4-8 Nakamas\n'+`${areas > 6?'✅ | ':'❌ | '}`+'Estar en la isla #6'
            break;
        case '6':
            re = `${at >= 80?'✅ | ':'❌ | '}`+'80 de AT\n'+`${def >= 80?'✅ | ':'❌ | '}`+'80 de DEF\n'+`${cr >= 640?'✅ | ':'❌ | '}`+'640 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 2?'✅ | ':'❌ | '}`+' 2-4 Nakamas\n'+`${areas > 5?'✅ | ':'❌ | '}`+'Estar en la isla #5'
            break;

        case '5':
            re = `${at >= 60?'✅ | ':'❌ | '}`+'60 de AT\n'+`${def >= 60?'✅ | ':'❌ | '}`+'60 de DEF\n'+`${cr >= 360?'✅ | ':'❌ | '}`+'360 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 2?'✅ | ':'❌ | '}`+' 2-4 Nakamas\n'+`${areas > 4?'✅ | ':'❌ | '}`+'Estar en la isla #4'
            break;
        case '4':
            re = `${at >= 40?'✅ | ':'❌ | '}`+'40 de AT\n'+`${def >= 40?'✅ | ':'❌ | '}`+'40 de DEF\n'+`${cr >= 240?'✅ | ':'❌ | '}`+'240 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 1?'✅ | ':'❌ | '}`+' 1-2 Nakamas\n'+`${areas > 3?'✅ | ':'❌ | '}`+'Estar en la isla #3'
            break;
        case '3':
            re = `${at >= 30?'✅ | ':'❌ | '}`+'30 de AT\n'+`${def >= 30?'✅ | ':'❌ | '}`+'30 de DEF\n'+`${cr >= 120?'✅ | ':'❌ | '}`+'120 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco\n'+`${naka > 1?'✅ | ':'❌ | '}`+' 1-2 Nakamas\n'+`${areas > 2?'✅ | ':'❌ | '}`+'Estar en la isla #2'
            break;
        case '2':
            re = `${at >= 20?'✅ | ':'❌ | '}`+'20 de AT\n'+`${def >= 20?'✅ | ':'❌ | '}`+'20 de DEF\n'+`${cr >= 40?'✅ | ':'❌ | '}`+'40 de Poder\n'+`${ba > 0?'✅ | ':'❌ | '}`+'1 Barco'
            break;
    }
    /*area 2 requisitos:
    20 de AT
    20 de Def
    40 de poder
    1 barco
    */

    /*area 3 requisitos:
    30 de AT
    30 de Def
    120 de poder
    1 barco
    1 - 2 nakamas */

    /*area 4 requisitos:
    40 de AT
    40 de Def
    1 barco
    240 de poder
    1 - 2 nakamas */

    /*area 5 requisitos:
    60 de AT
    60 de Def
    1 barco
    360 de poder
    2 - 4 nakamas */

    /*area 6 requisitos:
    80 de AT
    80 de Def
    1 barco
    640 de poder
    2 - 4 nakamas */

    /*area 7 requisitos:
    100 de AT
    100 de Def
    1 barco
    1000 de poder
    4 - 8 nakamas
    60% de suministros
    un log */

    /*area 8 requisitos:
    120 de AT
    120 de Def
    1 barco
    4 - 8 nakamas
    1680 de poder
    60% de suministros
    un log */

    /*area 9 requisitos:
    150 de AT
    150 de Def
    1 barco
    5 - 10 nakamas
    2400 de poder
    70% de suministros
    un log */

    /*area 10 requisitos:
    200 de AT
    200 de Def
    1 barco
    5 - 10 nakamas
    3200 de poder
    70% de suministros
    un log */

    /*area 11 requisitos:
    220 de AT
    220 de Def
    1 barco
    5 - 10 nakamas
    3520 de poder
    70% de suministros
    un log */

    /*area 12 requisitos:
    280 de AT
    280 de Def
    1 barco
    5 - 10 nakamas
    4480 de poder
    70% de suministros
    un log */

    /*area 13 requisitos:
    340 de AT
    340 de Def
    1 barco
    5 - 10 nakamas
    6120 de poder
    70% de suministros
    un log */

    /*area 14 requisitos:
    400 de AT
    400 de Def
    1 barco
    5 - 10 nakamas
    7200 de poder
    70% de suministros
    un log */

    /*area 15 requisitos:
    480 de AT
    480 de Def
    1 barco
    5 - 10 nakamas
    8640 de poder
    80% de suministros
    un log */

    /*area 16 requisitos:
    560 de AT
    560 de Def
    1 barco
    5 - 10 nakamas
    10.080 de poder
    80% de suministros
    un log */

    /*area 17 requisitos:
    640 de AT
    640 de Def
    1 barco
    5 - 15 nakamas
    11.520 de poder
    80% de suministros
    un log */

    /*area 18 requisitos:
    760 de AT
    760 de Def
    1 barco
    5 - 20 nakamas
    15.200 de poder
    80% de suministros
    un log */

    /*area 19 requisitos:
    910 de AT
    910 de Def
    1 barco
    5 - 20 nakamas
    18.200 de poder
    80% de suministros
    un log */

    /*area 20 requisitos:
    1200 de AT
    1200 de Def
    1 barco
    5 - 20 nakamas
    28.800 de poder
    80% de suministros
    un log */

    
    let maxarea = await perfil.obtener(`854572979353813032.${message.author.id}.area.maxarea`)
    if(area > maxarea) {
        //area1
        if(at >= 20){
            if(def >= 20){
                if(cr >= 40){
                    if(ba > 0){
                        if(areas === "1"){
                            message.channel.send('Pareces que estas listo para zarpar a la isla 2\nquieres ir? `si`|`no`')

                            const re = message.channel.createMessageCollector(m => m.author.id === message.author.id)
                            re.on("collect", async(msg) =>{
                                if(msg.content === 'si'){
                                    let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)

                                    message.channel.send(`**${name}**, ha decidido a zarpar a la isla 2`)
                                    re.stop()
                                    setTimeout(() => {
                                        message.channel.send('O no parece que hay Una Vaca Marina obtrullendo el camino\n**'+name+'** que deceas hacer?\n`atacar`|`volver`')
                                    }, 10000);


                                    const duel = message.channel.createMessageCollector(m => m.author.id === message.author.id)
                                        duel.on("collect", async(ms) =>{

                                            if(ms.content === 'atacar'){

                                                duel.stop()
                                                let xx = [];
                                                let vdv = 150;
                                                

                                                xx.push(message.author.id)
                                                const duell = message.channel.createMessageCollector(m => m.author.id === `${xx}`)
                                                let t = await perfil.obtener(`854572979353813032.${xx}.estadisticas.ataque`)
                                                let ef = await perfil.obtener(`854572979353813032.${xx}.estadisticas.defenza`)
                                                let nm = await perfil.obtener(`854572979353813032.${xx}.perfil.nombre`)

                                                message.channel.send(`**${nm}**, es tu turno\n\n1. Atacar(${t})\n2. Defender(${ef})`)
                                                
                                                duell.on("collect", async(m) =>{
                                                    let name = await perfil.obtener(`854572979353813032.${xx}.perfil.nombre`)
                                                    let a = await perfil.obtener(`854572979353813032.${xx}.estadisticas.ataque`)
                                                    let d = await perfil.obtener(`854572979353813032.${xx}.estadisticas.defenza`)  
                                                    let v = await perfil.obtener(`854572979353813032.${xx}`)

                                                    let atv = 30
                                                    let n = await crew.obtener(`854572979353813032.${id}.tripulacion.ids`)
                                                    let rnam = n[Math.floor(Math.random() * n.length)]
                                                    let rname = await perfil.obtener(`854572979353813032.${rnam}.perfil.nombre`)
                                                    let rvida = Math.floor(Math.random() * atv)
                                                    let cre = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)

                                                    let vd = Math.floor(Math.random() * a)
                                                    let r = vd - vdv
                                                    if(vd - vdv >= 0){
                                                        message.channel.send('**'+cre+'**, ha derrotado a la vaca marina y han partido a la isla 2')

                                                        message.channel.send(`**${cre}**, ha zarpado a la isla 2\nTiempo de viaje: 2h 59m 59s...`)
                                                        setTimeout(() => {
                                                            n.forEach(obj => {
                                                                perfil.establecer(`854572979353813032.${obj}.area.areas`, "2")
                                                                perfil.establecer(`854572979353813032.${obj}.area.maxarea`, 2)

                                                                
                                                            });
                                                        }, 1.08e+7);

                                                                
                                                        setInterval(async ()=>{

                                                            n.forEach(async obj =>{
                                                                cd.establecer(`854572979353813032.${obj}.viej`)
                                                                cooldown.set(`${obj}.explorar`, Date.now() + 1.08e+7);
                                                                let ml = await cd.obtener(`854572979353813032.${obj}.viej`)

     
                                                                   if(ml === 1){
                                                                   const timeLeft = cooldown.get(`${obj}.explorar`) - Date.now(); 
                                                                    const converted = convertMS(timeLeft); 
                                                                   
      }
                                                                cd.establecer(`854572979353813032.${obj}.viaje`, timeLeft)
                                                            })

                                                        }, 3000)
                                                        
                                                        duell.stop()
                                                        return
                                                    }
                                                    vdv = Math.abs(r)
                                                    xx.shift()
                                                    xx.push(rnam)
                                                    let at = await perfil.obtener(`854572979353813032.${xx}.estadisticas.ataque`)
                                                    let def = await perfil.obtener(`854572979353813032.${xx}.estadisticas.defenza`)


                                                    if(m.content === '1'){
                                                        
                                                        message.channel.send(`**${name}**, a atacado y sacado ${vd} de vida`)
                                                        message.channel.send(`Vaca Marina, ${vdv}/150`)
                                                        message.channel.send(`La Vaca Marina, a atacado a **${rname}** y sacado ${rvida} de vida`)
                                                        perfil.restar(`854572979353813032.${xx}.estadisticas.vida`, rvida) 
                                                       let vf = await perfil.obtener(`854572979353813032.${xx}.estadisticas.vida`) 
                                                       let vfm = await perfil.obtener(`854572979353813032.${xx}.estadisticas.maxvida`)

                                                        message.channel.send(`**${rname}**, es tu turno\n${vf}/${vfm}\n\n1. Atacar(${at})\n2. Defender(${def})`)
                                                    }

                                                })
                                                

                                            }
                                            if(ms === 'volver'){
                                                message.channel.send('has vuelto a la isla 1')
                                                duel.stop()
                                            }
                                        })



                                }

                                if(msg.content === 'no'){
                                    message.channel.send('ok')
                                }
                            })
                            return
                        }
                        
                    }
                }
            }
        }
         message.channel.send(`**${message.author.username}**, Todavía no tienes los requisitos para ir a esta isla`)

         const embed = new Discord.MessageEmbed()
         .setTitle('Requisitos')
         .setDescription(`${re}`)
         .setColor("RANDOM")
         message.channel.send(embed)
         return
    }

    message.channel.send(`**${message.author.username}** se ha movido a la área #${area}`)
    perfil.establecer(`854572979353813032.${message.author.id}.area.areas`, area)


 }

} 