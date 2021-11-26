const Discord = require('discord.js');
const db = require("megadb")
const cooldown = new Discord.Collection();
const { convertMS } = require("discordutility");
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const carcel = new db.crearDB('carcel', 'rpg') 

module.exports = {
  name: "explorar", 
  alias: ["exp"], 
  
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
    let time = `${xx}` === '1'?30000:60000;

//police
const carcel = new db.crearDB('carcel', 'rpg') 

if(!carcel.tiene(`854572979353813032.${message.author.id}`)){
  carcel.establecer(`854572979353813032.${message.author.id}`, {atrapado: 0,nivel: 0, fuerza: 0})
}
let atr = await carcel.obtener(`854572979353813032.${message.author.id}.atrapado`)
let nivel = await carcel.obtener(`854572979353813032.${message.author.id}.nivel`)
if(atr === 1){return message.channel.send(`Estas atrapado en una carcel nivel ${nivel}, pidele a tus nakamas que te salven`)}    
//cd{    
   if (cooldown.has(`${message.author.id}.explorar`)) {
      
      const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
      const converted = convertMS(timeLeft); 
      
      message.channel.send(`Ya Has Explorado, Espera Unos **${converted.m}m ${converted.s}s...**`)
    return
    }
    
    cooldown.set(`${message.author.id}.explorar`, Date.now() + time); 
    cd.establecer(`854572979353813032.${message.author.id}.cooldown.explorar.tiene`, 1)
    
    setTimeout(() => {
      cooldown.delete(`${message.author.id}.explorar`);
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.explorar.tiene`, 0)
      cd.establecer(`854572979353813032.${message.author.id}.cooldown.explorar.tiempo`, 0)
    }, time) 
    setInterval(async() =>{
      let ml = await cd.obtener(`854572979353813032.${message.author.id}.cooldown.explorar.tiene`)

     
      if(ml === 1){
        const timeLeft = cooldown.get(`${message.author.id}.explorar`) - Date.now(); 
        const converted = convertMS(timeLeft); 
        cd.establecer(`854572979353813032.${message.author.id}.cooldown.explorar.tiempo`, `${converted.m}m ${converted.s}s`)
      }
      
    }, 1000)

    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
    if(`${creado}` == 'undefined'){
      message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
      return
      
  }
//fin cd}

let nombre = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)//obtiene nombre del jugador
let area = await perfil.obtener(`854572979353813032.${message.author.id}.area.areas`)
let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
let def = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.defenza`)
  
  

//AREA #1
if(area === '1'){
    let n = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.navegante`)
    let monedas = (Math.floor(Math.random() * 3000)) + 2000*n//monedas randoms
    let moneda = monedas*2  //recompensa sabado y domingo
    let xp = (Math.floor(Math.random() * 15)) + 15*n//xp random
    let pvid = (Math.floor(Math.random() * 10))+5 - def//perdida de vida random
    let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
    

    let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
    let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
    let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
    var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
    let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
    let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

    if((marine) <= 8){
      message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

      const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
      cjuego.on('collect', async(msg) =>{
        if(msg.content == '1'){
          let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

          var bo = (Math.round(Math.random() * 50000))//bountry
          var fue = [20, 25, 30, 10, 15, 40]//fuerza de la marina
          let fer = fue[Math.floor(Math.random() * fue.length)]
          let x = (Math.round(Math.random() * 100))

          if(vi > fer){
            message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
            cjuego.stop()
            return
          }else if(vi < fer){
            var pp = [1,2,3,1]
            let ppr = pp[Math.floor(Math.random() * pp.length)]
            let des;
            switch(ppr){
              case 3:
                des = `Has derrotado a la marina.\n y has ganado ${x} XP`
                perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
                perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

              case 2:
                des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
                carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
                break;
              case 1:
                des = 'La marina te ha derrotado, pero te has logrado escapar.'
                break;
            }
            message.channel.send(`${nombre}, ${des}`)
            cjuego.stop()
            return
          }




          cjuego.stop()
          return
        }

        if(msg.content == '2'){
          message.channel.send('has huido de la marina')

          cjuego.stop()
          return
        }







      })

      return
    }//por si te encuentras a la marina
    if((cofre) <= 10){

        perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
        if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
            message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
            perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

            return
        }
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
        .setColor("GREEN")
        message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
        perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
        let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
   
    
    if(`${a}` === 'Sin Items'){
        inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
        
    }
   
    let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
    if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
    inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
    let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
    
        inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
        
        
        return
    }//por si te encuentras un cofre
      

        perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
        perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


        //vida 0
        if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
            message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
            /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

            if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
              return
            }
            perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

            return
        }
        //energia 0
        if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

          return
      }
        //embed mensaje
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
        .setColor("GREEN")
        .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
        message.channel.send(embed)
        
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew

        if(cr === 1){crew.sumar(`854572979353813032.${id}.tripulacion.xp`, `${xx}` === '1'?xp*3 :xp)}//suma xp crew

        perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
        //misiones
        if(`${expr}` === "Una Selva"){
          let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
          let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
          if(tiene === 0){return}

          if(id === 1){
            let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
            if(pr === 2){return}
            misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
          }
        }


//level crew
//nivel
if(cr == 1){
  let cxps = await crew.obtener(`854572979353813032.${id}.tripulacion.xp`)
let clevelup = await crew.obtener(`854572979353813032.${id}.tripulacion.maxp`)
if(cxps >= clevelup){
    crew.sumar(`854572979353813032.${id}.tripulacion.nivel`, 1)//suma 1 nivel
    let nivell = await crew.obtener(`854572979353813032.${id}.tripulacion.nivel`)//obtiene el nivel actual
    crew.sumar(`854572979353813032.${id}.tripulacion.maxp`, 5 * (nivell ** 5) + 20 * nivell + 500)//suma el maximo de xp
   

   


    crew.establecer(`854572979353813032.${id}.tripulacion.xp`, 0)//returna el xp a 0

let crn = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
    
    message.channel.send(`Felicidades, el Crew **${crn}** Acaba de subir al nivel **${nivell}**!!!`)//envia mensaje
}

}

        //nivel
        let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
        let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
        if(xps >= levelup){
          let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
            let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
           

            let vd;
            let at;
            let def;
            switch(rol){
              case '🤖 Cyborg':
                vd = 5
                at = 6
                def = 8
                break;
              case '🧭 Navegante':
                vd = 5
                at = 3
                def = 3
                break;
              case '🔫 Tirador':
                vd = 5
                at = 4
                def = 2
                break;
              case '🔍 Arqueologa':
                vd = 5
                at = 2
                def = 2
                break;
              case '🔍 Arqueologo':
                vd = 5
                at = 2
                def = 2
                break;
              case '<:espadachin:906596039535001601> Espadachin':
                vd = 5
                at = 2
                def = 4
                break;
              case '<:SimboloHospital:901623144631128135> Doctora':
                vd = 15
                at = 2
                def = 2
                break;
              case '<:SimboloHospital:901623144631128135> Doctor':
                vd = 15
                at = 2
                def = 2
                break;
            }
            perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
            perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
            perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
            perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

            let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
            let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
            perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


            perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
            perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


            let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
            let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
            
            if(cr === 1){
              crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
              crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
            }
            


            
            message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
        }
}    
//AREA #2
if(area === '2'){
      let n = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.navegante`)

      let monedas = (Math.floor(Math.random() * 4000)) + 2500*n//monedas randoms
      let moneda = monedas*2 //recompensa sabado y domingo
      let xp = (Math.floor(Math.random() * 30)) + 30*n//xp random
      let pvid = (Math.floor(Math.random() * 10))+20//perdida de vida random
      let pvida= []
      if(pvid < 0){pvida.push(0)}
      if(pvid > 0){pvida.push(pvid)}
      let ener = (Math.floor(Math.random() * 4)) + 2//perdida de energia random
      let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
      let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
      var exp = ["Un Cementerio", "Un Lago", "Un Bunque", "Una Playa ⛱️", "Un Palacio 🕌", "Una Montaña ⛰️"]//lo que explora el jugador
      let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
      let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina
  
      if((marine) <= 8){
        message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje
  
        const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
        cjuego.on('collect', async(msg) =>{
          if(msg.content == '1'){
            let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)
  
            var bo = (Math.round(Math.random() * 60000))//bountry
            var fue = [40, 45, 40, 20, 35, 60]//fuerza de la marina
            let fer = fue[Math.floor(Math.random() * fue.length)]
            let x = (Math.round(Math.random() * 153))
  
            if(vi > fer){
              message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
              cjuego.stop()
              return
            }else if(vi < fer){
              var pp = [1,2,3,1]
              let ppr = pp[Math.floor(Math.random() * pp.length)]
              let des;
              switch(ppr){
                case 3:
                  des = `Has derrotado a la marina.\n y has ganado ${x} XP`
                  perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
                  perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)
  
                case 2:
                  des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
                  carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
                  break;
                case 1:
                  des = 'La marina te ha derrotado, pero te has logrado escapar.'
                  break;
              }
              message.channel.send(`${nombre}, ${des}`)
              cjuego.stop()
              return
            }
  
  
  
  
            cjuego.stop()
            return
          }
  
          if(msg.content == '2'){
            message.channel.send('has huido de la marina')
  
            cjuego.stop()
            return
          }
  
  
  
  
  
  
  
        })
  
        return
      }//por si te encuentras a la marina
      if((cofre) <= 10){
  
          perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
          if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
              message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
              perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)
  
              return
          }
          const embed = new Discord.MessageEmbed()
          .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
          .setColor("GREEN")
          message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
          perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
          let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
     
      
      if(`${a}` === 'Sin Items'){
          inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
          
      }
     
      let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
      if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
      inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
      let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
      
          inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
          
          
          return
      }//por si te encuentras un cofre
        
  
          perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
          perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia
  
  
          //vida 0
          if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
              message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
              /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)
  
              if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
                return
              }
              perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/
  
              return
          }
          //energia 0
          if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
            message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
            perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)
  
            return
        }
          //embed mensaje
          const embed = new Discord.MessageEmbed()
          .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\n\nHas Ganadó: +**${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')}**<:berri:907114454108491806> y +**${`${xx}` === '1'?xp*3 :xp}** <:xp:912544939722833970>\nPerdiste: -**${pvida}** ❤️ de Vida, Te queda **${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}**\nGastaste: -**${ener}** ⚡ de Energia, Te queda **${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}**`)
          .setColor("GREEN")
          .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
          message.channel.send(embed)
          
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew

        if(cr === 1){crew.sumar(`854572979353813032.${id}.tripulacion.xp`, `${xx}` === '1'?xp*3 :xp)}//suma xp crew
          
          perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
          //misiones
          if(`${expr}` === "Un Lago"){
            let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
            let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
            if(tiene === 0){return}
  
            if(id === 1){
              let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
              if(pr === 2){return}
              misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
            }
          }
  
 /*//automatic denis
  if(message.author.id === '674758623204999168'){
    console.log('Funcionando Denis')
  setInterval(async() => {
  
    let id = '674758623204999168'
    let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)
    
    let mone = (Math.floor(Math.random() * 4000)) + 2500 *2
      let moneds = monedas*2 //recompensa sabado y domingo
      let xp = (Math.floor(Math.random() * 30)) + 30 *3
      let marine = (Math.round(Math.random() * 100))
      let cofre = (Math.floor(Math.random() * 100))
  
  
      
  
  
      if((marine) <= 8){
        
            var bo = (Math.round(Math.random() * 75000))//bountry
            
            let x = (Math.round(Math.random() * 100)) *3
  
           
              console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
              perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
              perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
           
           
  
  
  
  
  
  
  
  
  
        
  
        return
      }
      if((cofre) <= 10){
  
         
          console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
          
          console.log('Oh Felicidades Has Encontrado Un Cofre Común')
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
          perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
          let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
     
      
      if(`${a}` === 'Sin Items'){
          inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
          
      }
     
      let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
      if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
      inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
      inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
      let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
      
          inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
          
          
          return
      }
    console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
    let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew

        if(cr === 1){crew.sumar(`854572979353813032.${ids}.tripulacion.xp`, `${xx}` === '1'?xp*3 :xp)}//suma xp crew
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?mone :mone)
    let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    let cxps = await crew.obtener(`854572979353813032.${ids}.tripulacion.xp`)
    let clevelup = await crew.obtener(`854572979353813032.${ids}.tripulacion.maxp`)
    if(cxps >= clevelup){
        crew.sumar(`854572979353813032.${ids}.tripulacion.nivel`, 1)//suma 1 nivel
        let nivell = await crew.obtener(`854572979353813032.${ids}.tripulacion.nivel`)//obtiene el nivel actual
        crew.sumar(`854572979353813032.${ids}.tripulacion.maxp`, 2 * (nivell ** 3) + 20 * nivell + 150)//suma el maximo de xp
       
    
       
    
    
        crew.establecer(`854572979353813032.${ids}.tripulacion.xp`, 0)//returna el xp a 0
    
    let crn = await crew.obtener(`854572979353813032.${ids}.tripulacion.nombre`)
        
        console.log(`Felicidades, el Crew **${crn}** Acaba de subir al nivel **${nivell}**!!!`)//envia mensaje
    }//cr
          if(xps >= levelup){
            let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
            perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
            let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
            perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
           
  
            let vd;
            let at;
            let def;
            switch(rol){
              case '🤖 Cyborg':
                vd = 5
                at = 6
                def = 8
                break;
              case '🧭 Navegante':
                vd = 5
                at = 2
                def = 2
                break;
              case '🔫 Tirador':
                vd = 5
                at = 4
                def = 2
                break;
              case '🔍 Arqueologa':
                vd = 5
                at = 2
                def = 2
                break;
              case '🔍 Arqueologo':
                vd = 5
                at = 2
                def = 2
                break;
              case '<:espadachin:906596039535001601> Espadachin':
                vd = 5
                at = 2
                def = 4
                break;
              case '<:SimboloHospital:901623144631128135> Doctora':
                vd = 15
                at = 2
                def = 2
                break;
              case '<:SimboloHospital:901623144631128135> Doctor':
                vd = 15
                at = 2
                def = 2
                break;
            }
            perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
            perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
            perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
            perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 
  
            let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
            let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
            perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia
  
  
            perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
            perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0
  
  
            let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
            let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
            
            if(cr === 1){
              crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
              crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
            }
            
  
  
  
              
              console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
          }
    
  }, 30000);}*/
  
          //nivel
          let cxps = await crew.obtener(`854572979353813032.${id}.tripulacion.xp`)
let clevelup = await crew.obtener(`854572979353813032.${id}.tripulacion.maxp`)
if(cxps >= clevelup){
    crew.sumar(`854572979353813032.${id}.tripulacion.nivel`, 1)//suma 1 nivel
    let nivell = await crew.obtener(`854572979353813032.${id}.tripulacion.nivel`)//obtiene el nivel actual
    crew.sumar(`854572979353813032.${id}.tripulacion.maxp`, 2 * (nivell ** 3) + 20 * nivell + 150)//suma el maximo de xp
   

   


    crew.establecer(`854572979353813032.${id}.tripulacion.xp`, 0)//returna el xp a 0

let crn = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
    
    message.channel.send(`Felicidades, el Crew **${crn}** Acaba de subir al nivel **${nivell}**!!!`)//envia mensaje
}//cr
          let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
          let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
          if(xps >= levelup){
            let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
              let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
             
  
              let vd;
              let at;
              let def;
              switch(rol){
                case '🤖 Cyborg':
                  vd = 5
                  at = 6
                  def = 8
                  break;
                case '🧭 Navegante':
                  vd = 5
                  at = 2
                  def = 2
                  break;
                case '🔫 Tirador':
                  vd = 5
                  at = 4
                  def = 2
                  break;
                case '🔍 Arqueologa':
                  vd = 5
                  at = 2
                  def = 2
                  break;
                case '🔍 Arqueologo':
                  vd = 5
                  at = 2
                  def = 2
                  break;
                case '<:espadachin:906596039535001601> Espadachin':
                  vd = 5
                  at = 2
                  def = 4
                  break;
                case '<:SimboloHospital:901623144631128135> Doctora':
                  vd = 15
                  at = 2
                  def = 2
                  break;
                case '<:SimboloHospital:901623144631128135> Doctor':
                  vd = 15
                  at = 2
                  def = 2
                  break;
              }
              perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
              perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
              perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
              perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 
  
              let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
              let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
              perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia
  
  
              perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
              perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0
  
  
              let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
              let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
              
              if(cr === 1){
                crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
                crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
              }
              
  
  
              
              message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
          }
}     
//AREA #3
if(area === '3'){
  let monedas = (Math.floor(Math.random() * 5000)) + 3000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 45)) + 45//xp random
  let pvid = (Math.floor(Math.random() * 15))+50//perdida de vida random
  let pvida= []
  if(pvid < 0){pvida.push(0)}
  if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 4)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Unas Ruinas", "Una Iglesia", "Una Cascada", "Una Piramide", "Una Cueva", "Un Arbol"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 15){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 80000))//bountry
        var fue = [60, 65, 70, 40, 55, 120]//fuerza de la marina
        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel II'
        

              carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew

        if(cr === 1){crew.sumar(`854572979353813032.${id}.tripulacion.xp`, `${xx}` === '1'?xp*3 :xp)}//suma xp crew
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let cxps = await crew.obtener(`854572979353813032.${id}.tripulacion.xp`)
let clevelup = await crew.obtener(`854572979353813032.${id}.tripulacion.maxp`)
if(cxps >= clevelup){
    crew.sumar(`854572979353813032.${id}.tripulacion.nivel`, 1)//suma 1 nivel
    let nivell = await crew.obtener(`854572979353813032.${id}.tripulacion.nivel`)//obtiene el nivel actual
    crew.sumar(`854572979353813032.${id}.tripulacion.maxp`, 5 * (nivell ** 5) + 150 * nivell + 1000)//suma el maximo de xp
   

   


    crew.establecer(`854572979353813032.${id}.tripulacion.xp`, 0)//returna el xp a 0

let crn = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
    
    message.channel.send(`Felicidades, el Crew **${crn}** Acaba de subir al nivel **${nivell}**!!!`)//envia mensaje
}//cr
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #4
if(area === '4'){
  let monedas = (Math.floor(Math.random() * 6000)) + 3500//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 60)) + 60//xp random
  let pvid = (Math.floor(Math.random() * 20))+20//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 8){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 100000))//bountry
        var fue = [80, 85, 90, 60, 75, 180]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            
              

              carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew

        if(cr === 1){crew.sumar(`854572979353813032.${id}.tripulacion.xp`, `${xx}` === '1'?xp*3 :xp)}//suma xp crew
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #5
if(area === '5'){
  let monedas = (Math.floor(Math.random() * 7000)) + 4000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 75)) + 75//xp random
  let pvid = (Math.floor(Math.random() * 30))+30//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 15){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 100000))//bountry
        var fue = [100, 105, 110, 80, 95, 200]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel II'
              

              carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #6
if(area === '6'){
  let monedas = (Math.floor(Math.random() * 8000)) +4500//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 90)) + 90//xp random
  let pvid = (Math.floor(Math.random() * 40))+40//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 16){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 110000))//bountry
        var fue = [120, 125, 130, 100, 115, 220]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel II'
              

              carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #7
if(area === '7'){
  let monedas = (Math.floor(Math.random() * 9000)) + 5000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 105)) + 105//xp random
  let pvid = (Math.floor(Math.random() * 50))+50//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 17){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 130000))//bountry
        var fue = [140, 145, 150, 120, 135, 240]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel II'
              

              carcel.establecer(`854572979353813032.${message.author.id}.atrapado`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, 1)
                carcel.establecer(`854572979353813032.${message.author.id}.nivel`, fer)
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #8
if(area === '8'){
  let monedas = (Math.floor(Math.random() * 10000)) + 5500//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 120)) + 120//xp random
  let pvid = (Math.floor(Math.random() * 60))+60//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 18){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 150000))//bountry
        var fue = [200, 215, 250, 220, 235, 340]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #9
if(area === '9'){
  let monedas = (Math.floor(Math.random() * 11000)) + 6000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 135)) + 135//xp random
  let pvid = (Math.floor(Math.random() * 75))+75//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 19){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [250, 265, 300, 270, 285, 390]//fuerza de la marina

        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #10
if(area === '10'){
  let monedas = (Math.floor(Math.random() * 12000)) + 6500//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 150)) + 150//xp random
  let pvid = (Math.floor(Math.random() * 100))+100//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 20){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [300, 315, 350, 220, 335, 440]//fuerza de la marina
        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #11
if(area === '11'){
  let monedas = (Math.floor(Math.random() * 13000)) + 7000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 165)) + 165//xp random
  let pvid = (Math.floor(Math.random() * 100))+100//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 20){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [400, 415, 450, 320, 435, 540]//fuerza de la marina
        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
} 
//AREA #12
if(area === '12'){
  let monedas = (Math.floor(Math.random() * 14000)) + 7500//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 180)) + 180//xp random
  let pvid = (Math.floor(Math.random() * 150))+150//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

  if((marine) <= 20){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

        var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [500, 515, 550, 420, 535, 640]//fuerza de la marina
        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))

        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }




        cjuego.stop()
        return
      }

      if(msg.content == '2'){
        message.channel.send('has huido de la marina')

        cjuego.stop()
        return
      }







    })

    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    

      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}

        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))


  


  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3

       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       









    

    return
  }
  if((cofre) <= 10){

     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
 
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
 
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        



          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }

}, 30000);}*/

      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         

          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          


          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
}     
//AREA #13
if(area === '13'){
let monedas = (Math.floor(Math.random() * 15000)) + 8000//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 195)) + 195//xp random
let pvid = (Math.floor(Math.random() * 175))+175//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 8){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [600, 615, 650, 520, 635, 740]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #14
if(area === '14'){
let monedas = (Math.floor(Math.random() * 16000)) + 8500//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 210)) + 210//xp random
let pvid = (Math.floor(Math.random() * 200))+200//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 20){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [600, 615, 650, 520, 635, 740]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #15
if(area === '15'){
let monedas = (Math.floor(Math.random() * 17000)) + 9000//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 225)) + 225//xp random
let pvid = (Math.floor(Math.random() * 220))+200//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 20){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [600, 615, 650, 520, 635, 740]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #16
if(area === '16'){
let monedas = (Math.floor(Math.random() * 18000)) + 9500//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 240)) + 240//xp random
let pvid = (Math.floor(Math.random() * 250))+250//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 21){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [600, 615, 650, 520, 635, 740]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #17
if(area === '17'){
let monedas = (Math.floor(Math.random() * 19000)) + 10000//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 280)) + 280//xp random
let pvid = (Math.floor(Math.random() * 320))+300//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 22){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [750, 765, 800, 680, 785, 890]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #18
if(area === '18'){
let monedas = (Math.floor(Math.random() * 20000)) + 11000//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 350)) + 350//xp random
let pvid = (Math.floor(Math.random() * 350))+340//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 23){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [850, 865, 900, 780, 885, 1000]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #19
if(area === '19'){
let monedas = (Math.floor(Math.random() * 21000)) + 12000//monedas randoms
let moneda = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 400)) + 400//xp random
let pvid = (Math.floor(Math.random() * 450))+450//perdida de vida random
let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina

if((marine) <= 25){
  message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje

  const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
  cjuego.on('collect', async(msg) =>{
    if(msg.content == '1'){
      let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)

      var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [750, 765, 800, 680, 785, 890]//fuerza de la marina
      let fer = fue[Math.floor(Math.random() * fue.length)]
      let x = (Math.round(Math.random() * 100))

      if(vi > fer){
        message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
        cjuego.stop()
        return
      }else if(vi < fer){
        var pp = [1,2,3,1]
        let ppr = pp[Math.floor(Math.random() * pp.length)]
        let des;
        switch(ppr){
          case 3:
            des = `Has derrotado a la marina.\n y has ganado ${x} XP`
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
            perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)

          case 2:
            des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
            break;
          case 1:
            des = 'La marina te ha derrotado, pero te has logrado escapar.'
            break;
        }
        message.channel.send(`${nombre}, ${des}`)
        cjuego.stop()
        return
      }




      cjuego.stop()
      return
    }

    if(msg.content == '2'){
      message.channel.send('has huido de la marina')

      cjuego.stop()
      return
    }







  })

  return
}//por si te encuentras a la marina
if((cofre) <= 10){

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        return
    }
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
    .setColor("GREEN")
    message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)

    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}//por si te encuentras un cofre
  

    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
    perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia


    //vida 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
        /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)

        if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
          return
        }
        perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/

        return
    }
    //energia 0
    if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
      message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)

      return
  }
    //embed mensaje
    const embed = new Discord.MessageEmbed()
    .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
    .setColor("GREEN")
    .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
    message.channel.send(embed)
    
    perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
    //misiones
    if(`${expr}` === "Una Selva"){
      let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
      let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
      if(tiene === 0){return}

      if(id === 1){
        let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
        if(pr === 2){return}
        misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
      }
    }

/*//automatic denis
if(message.author.id === '674758623204999168'){
console.log('Funcionando Denis')
setInterval(async() => {

let id = '674758623204999168'
let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
let moneds = monedas*2 //recompensa sabado y domingo
let xp = (Math.floor(Math.random() * 15)) + 15 *5
let marine = (Math.round(Math.random() * 100))
let cofre = (Math.floor(Math.random() * 100))





if((marine) <= 8){
  
      var bo = (Math.round(Math.random() * 50000))//bountry
      
      let x = (Math.round(Math.random() * 100)) *3

     
        console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
        perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
        perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
     
     









  

  return
}
if((cofre) <= 10){

   
    console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
    
    console.log('Oh Felicidades Has Encontrado Un Cofre Común')
    perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
    perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
    let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)


if(`${a}` === 'Sin Items'){
    inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
    
}

let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)

    inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
    
    
    return
}
console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
      perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
      let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
      perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
     

      let vd;
      let at;
      let def;
      switch(rol){
        case '🤖 Cyborg':
          vd = 5
          at = 6
          def = 8
          break;
        case '🧭 Navegante':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔫 Tirador':
          vd = 5
          at = 4
          def = 2
          break;
        case '🔍 Arqueologa':
          vd = 5
          at = 2
          def = 2
          break;
        case '🔍 Arqueologo':
          vd = 5
          at = 2
          def = 2
          break;
        case '<:espadachin:906596039535001601> Espadachin':
          vd = 5
          at = 2
          def = 4
          break;
        case '<:SimboloHospital:901623144631128135> Doctora':
          vd = 15
          at = 2
          def = 2
          break;
        case '<:SimboloHospital:901623144631128135> Doctor':
          vd = 15
          at = 2
          def = 2
          break;
      }
      perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
      perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
      perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

      let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
      let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
      perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


      perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
      perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0


      let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
      let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
      
      if(cr === 1){
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
        crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
      }
      



        
        console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
    }

}, 30000);}*/

    //nivel
    let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
    let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
    if(xps >= levelup){
      let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       

        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 

        let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia


        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0


        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
        }
        


        
        message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
    }
} 
//AREA #20
if(area === '20'){
  let monedas = (Math.floor(Math.random() * 22000)) + 13000//monedas randoms
  let moneda = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 500)) + 500//xp random
  let pvid = (Math.floor(Math.random() * 610))+600//perdida de vida random
  let pvida= []
    if(pvid < 0){pvida.push(0)}
    if(pvid > 0){pvida.push(pvid)}
  let ener = (Math.floor(Math.random() * 3)) + 1//perdida de energia random
  let vidar = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida de un jugador
  let cofre = (Math.floor(Math.random() * 100))//posibilidad de que toque un cofre
  var exp = ["Un Bosque", "Una Selva", "Una Caberna", "Un Castillo", "Un Barco", "Una Casa Embrujada"]//lo que explora el jugador
  let expr = exp[Math.floor(Math.random() * exp.length)]//lo de arriba
  let marine = (Math.round(Math.random() * 100))//pobilidad qde que te encuentres con la marina
  
  if((marine) <= 30){
    message.channel.send('Te has encontrado con la Marina, ¿Que deceas hacer?\n1. Pelear\n2. Huir')//mensaje
  
    const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
    cjuego.on('collect', async(msg) =>{
      if(msg.content == '1'){
        let vi = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)
  
        var bo = (Math.round(Math.random() * 50000))//bountry
        var fue = [350, 465, 500, 680, 785, 800]//fuerza de la marina
        
        let fer = fue[Math.floor(Math.random() * fue.length)]
        let x = (Math.round(Math.random() * 100))
  
        if(vi > fer){
          message.channel.send(`${nombre}, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?x*2:x)
          cjuego.stop()
          return
        }else if(vi < fer){
          var pp = [1,2,3,1]
          let ppr = pp[Math.floor(Math.random() * pp.length)]
          let des;
          switch(ppr){
            case 3:
              des = `Has derrotado a la marina.\n y has ganado ${x} XP`
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.wanted`, bo)
              perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, x)
  
            case 2:
              des = 'La marina te ha derrotado, y te ha llevado a una carcel nivel I'
              break;
            case 1:
              des = 'La marina te ha derrotado, pero te has logrado escapar.'
              break;
          }
          message.channel.send(`${nombre}, ${des}`)
          cjuego.stop()
          return
        }
  
  
  
  
        cjuego.stop()
        return
      }
  
      if(msg.content == '2'){
        message.channel.send('has huido de la marina')
  
        cjuego.stop()
        return
      }
  
  
  
  
  
  
  
    })
  
    return
  }//por si te encuentras a la marina
  if((cofre) <= 10){
  
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido la conciencia...`)
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)
  
          return
      }
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${monedas.toLocaleString('en-US')} Berris y ${xp} XP\n<:cofrecomun:890255012138205255>Cofre Común\nPerdió ${pvida} HP, HP restante es ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}`)
      .setColor("GREEN")
      message.channel.send('Oh Felicidades Has Encontrado Un <:cofrecomun:890255012138205255> Cofre Común',embed)
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioi`)
  
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, 'Sin Items')
      
  }
  
  let cs = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${message.author.id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }//por si te encuentras un cofre
    
  
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.vida`, pvida)//le resta la vida
      perfil.restar(`854572979353813032.${message.author.id}.estadisticas.energia`, ener)//le resta energia
  
  
      //vida 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}` <= 0)){
          message.channel.send(`**${nombre}** Se ha quedado sin vida y a perdido conocimiento...\nPidele a un Doctor que te ayude o perderas un nivel... en unos **10 Minutos**.`)
          /*perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, 1)
  
          if(`${await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)}` === 1){
            return
          }
          perfil.restar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)*/
  
          return
      }
      //energia 0
      if((`${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}` <= 0)){
        message.channel.send(`**${nombre}** Se ha quedado agotado explorando...\nRecuerda Fijarte En Tu Energia Antes De Explorar`)
        perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, 1)
  
        return
    }
      //embed mensaje
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${nombre}** A Salido A Explorar **${expr}**\nGanó <:berri:907114454108491806>${`${xx}` === '1'?moneda.toLocaleString('en-US'):monedas.toLocaleString('en-US')} Berris y ${`${xx}` === '1'?xp*3 :xp} XP\nPerdió ❤️${pvida} HP, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.vida`)}/${vidar}\nGasto ⚡${ener} de Energia, Le queda ${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.energia`)}/${await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)}`)
      .setColor("GREEN")
      .setFooter(`${xx}` === '1'?'Recompensa De Finde x2':'')
      message.channel.send(embed)
      
      perfil.sumar(`854572979353813032.${message.author.id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)//suma xp
      perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, `${xx}` === '1'?moneda :monedas)//suma monedas
      //misiones
      if(`${expr}` === "Una Selva"){
        let tiene = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.tiene`)
        let id = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.idm`)
        if(tiene === 0){return}
  
        if(id === 1){
          let pr = await misiones.obtener(`854572979353813032.${message.author.id}.misiones.pr`)
          if(pr === 2){return}
          misiones.sumar(`854572979353813032.${message.author.id}.misiones.pr`, 1)
        }
      }
  
  /*//automatic denis
  if(message.author.id === '674758623204999168'){
  console.log('Funcionando Denis')
  setInterval(async() => {
  
  let id = '674758623204999168'
  let mone = (Math.floor(Math.random() * 3000)) + 2000 *2
  let moneds = monedas*2 //recompensa sabado y domingo
  let xp = (Math.floor(Math.random() * 15)) + 15 *5
  let marine = (Math.round(Math.random() * 100))
  let cofre = (Math.floor(Math.random() * 100))
  
  
  
  
  
  if((marine) <= 8){
    
        var bo = (Math.round(Math.random() * 50000))//bountry
        
        let x = (Math.round(Math.random() * 100)) *3
  
       
          console.log(`Denis, Has derrotado a la marina.\n y ganaste ${`${xx}` === '1'?x*2:x} XP`)
          perfil.sumar(`854572979353813032.${id}.progreso.wanted`, `${xx}` === '1'?bo*2:bo)
          perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?x*2:x)
       
       
  
  
  
  
  
  
  
  
  
    
  
    return
  }
  if((cofre) <= 10){
  
     
      console.log(`Denis A Salido A Explorar Ganó ${mone} Berris y ${xp} XP encontro un Cofre Común`)
      
      console.log('Oh Felicidades Has Encontrado Un Cofre Común')
      perfil.sumar(`854572979353813032.${id}.progreso.xp`, xp)
      perfil.sumar(`854572979353813032.${id}.money.dinero`, monedas)
      let a = await inventario.obtener(`854572979353813032.${id}.inventarioi`)
  
  
  if(`${a}` === 'Sin Items'){
      inventario.extract(`854572979353813032.${id}.inventarioi`, 'Sin Items')
      
  }
  
  let cs = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  if(cs === 0){inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: 0`)}
  inventario.extract(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${cs}`)
  inventario.sumar(`854572979353813032.${id}.cofres.comun`, 1)
  let c = await inventario.obtener(`854572979353813032.${id}.cofres.comun`)
  
      inventario.push(`854572979353813032.${id}.inventarioi`, `**<:cofrecomun:890255012138205255> Cofre Común**: ${c}`)
      
      
      return
  }
  console.log(`Denis gano ${`${xx}`==='1'?xp*3:xp} de xp y ${`${xx}` === '1'?mone*2 :mone} Berries`)
  perfil.sumar(`854572979353813032.${id}.progreso.xp`, `${xx}` === '1'?xp*3 :xp)
  perfil.sumar(`854572979353813032.${id}.money.dinero`, `${xx}` === '1'?moneda :monedas)
  let xps = await perfil.obtener(`854572979353813032.${id}.progreso.xp`)
  let levelup = await perfil.obtener(`854572979353813032.${id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${id}.perfil.rol`)
        perfil.sumar(`854572979353813032.${id}.progreso.nivel`, 1)//suma 1 nivel
        let nivell = await perfil.obtener(`854572979353813032.${id}.progreso.nivel`)//obtiene el nivel actual
        perfil.sumar(`854572979353813032.${id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
       
  
        let vd;
        let at;
        let def;
        switch(rol){
          case '🤖 Cyborg':
            vd = 5
            at = 6
            def = 8
            break;
          case '🧭 Navegante':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔫 Tirador':
            vd = 5
            at = 4
            def = 2
            break;
          case '🔍 Arqueologa':
            vd = 5
            at = 2
            def = 2
            break;
          case '🔍 Arqueologo':
            vd = 5
            at = 2
            def = 2
            break;
          case '<:espadachin:906596039535001601> Espadachin':
            vd = 5
            at = 2
            def = 4
            break;
          case '<:SimboloHospital:901623144631128135> Doctora':
            vd = 15
            at = 2
            def = 2
            break;
          case '<:SimboloHospital:901623144631128135> Doctor':
            vd = 15
            at = 2
            def = 2
            break;
        }
        perfil.sumar(`854572979353813032.${id}.estadisticas.ataque`, at)//suma el at
        perfil.sumar(`854572979353813032.${id}.estadisticas.defenza`, def)//suma la defenza
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxvida`, vd)//suma el maximo de vida
        perfil.sumar(`854572979353813032.${id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 
  
        let vda = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
        let enga = await perfil.obtener(`854572979353813032.${id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
        perfil.establecer(`854572979353813032.${id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia
  
  
        perfil.establecer(`854572979353813032.${id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
        perfil.establecer(`854572979353813032.${id}.progreso.xp`, 0)//returna el xp a 0
  
  
        let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)//obtiene id de crew 
        let cr = await perfil.obtener(`854572979353813032.${id}.crew.tripu`)//ve si tiene crew
        
        if(cr === 1){
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.at`, at)//suma at en el crew
          crew.sumar(`854572979353813032.${ids}.tripulacion.estad.def`, def)//suma def en el crew
        }
        
  
  
  
          
          console.log(`Felicidades, Denis Acabas De Subir Al Nivel **${nivell}**!!!`)
      }
  
  }, 30000);}*/
  
      //nivel
      let xps = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.xp`)
      let levelup = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.maxp`)
      if(xps >= levelup){
        let rol = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.rol`)
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.nivel`, 1)//suma 1 nivel
          let nivell = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.nivel`)//obtiene el nivel actual
          perfil.sumar(`854572979353813032.${message.author.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
         
  
          let vd;
          let at;
          let def;
          switch(rol){
            case '🤖 Cyborg':
              vd = 5
              at = 6
              def = 8
              break;
            case '🧭 Navegante':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔫 Tirador':
              vd = 5
              at = 4
              def = 2
              break;
            case '🔍 Arqueologa':
              vd = 5
              at = 2
              def = 2
              break;
            case '🔍 Arqueologo':
              vd = 5
              at = 2
              def = 2
              break;
            case '<:espadachin:906596039535001601> Espadachin':
              vd = 5
              at = 2
              def = 4
              break;
            case '<:SimboloHospital:901623144631128135> Doctora':
              vd = 15
              at = 2
              def = 2
              break;
            case '<:SimboloHospital:901623144631128135> Doctor':
              vd = 15
              at = 2
              def = 2
              break;
          }
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)//suma el at
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)//suma la defenza
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxvida`, vd)//suma el maximo de vida
          perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.maxenergia`, 1)//suma el maximo de energia 
  
          let vda = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxvida`)//obtiene el maximo de vida actual
          let enga = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.maxenergia`)//obtiene el maximo de energia actual
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.energia`, enga)//establece el maximo de energia en la energia
  
  
          perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.vida`, vda)//establece el maximo de vida en la vida
          perfil.establecer(`854572979353813032.${message.author.id}.progreso.xp`, 0)//returna el xp a 0
  
  
          let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)//obtiene id de crew 
          let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)//ve si tiene crew
          
          if(cr === 1){
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)//suma at en el crew
            crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)//suma def en el crew
          }
          
  
  
          
          message.channel.send(`Felicidades, **${nombre}** Acabas De Subir Al Nivel **${nivell}**!!!`)//envia mensaje
      }
  } 


  

 }

} 