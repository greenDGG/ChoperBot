const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const emojis = ['901623144631128135', '906596039535001601', '🔍', '🔫', '🧭', '🤖','♂️','♀️']

module.exports = {
  name: "crear", 
  alias: ["start"], 
  
async execute (client, message, args){
  
    
    let nombre = args.join(' ')
    
    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
    var mar = ["West Blue", "East Blue", "South Blue", "North Blue"]
    var mran = mar[Math.floor(Math.random() * mar.length)]
    let isla;
    switch (mran){
      case "West Blue":
        isla = "Jumpfoot"
        break;
      case "East Blue":
        isla = "Dawn Island"
        break;
      case "South Blue":
        isla = "Highsea"
        break;
      case "North Blue":
        isla = "Gamfill Island"      
    }
    let hak = Math.floor(Math.random() * 100)

    

    
    
      


  
 
  if(`${creado}` == 'undefined'){
    if(!nombre){
      const embed = new Discord.MessageEmbed()
      .setDescription(`${message.author}, para crear tu perfil necesito que me digas un nombre para el perfil.`)
      .setFooter("[op!crear {nombre}]")
      .setColor("RANDOM")
      message.channel.send(embed)
      
      return
  }
    let rol = [];
    let genero = [];
    const embed1 = new Discord.MessageEmbed()
    .setAuthor(`Creacion De Personaje Para ${nombre}`)
    .setTitle('Seleciona tu Rol')
    .setDescription(`Reacciona para seleccionar el **Rol** de tu personaje **${nombre}**`)
    .addFields(
      {
        name: 'Doctor',
        value: '<:SimboloHospital:901623144631128135>\nPodras curar a todas las personas que quieras\ny tendras +15 de Vida x Nivel'
      },
      {
        name: 'Espadachin',
        value: '<:espadachin:906596039535001601>\nTendras un +10% de Ataque usando una espada/katana\ny tendras +4 de Defenza x Nivel'
      },
      {
        name: 'Tirador',//subtitulo
        value: '🔫\nTendras Mas posibilidades de pegar criticos con armas/cañones\ny tendras +4 de Ataque x Nivel'//loque le sigue
      },
      {
        name: 'Arqueologo',
        value: '🔍\nTendras mas posibilidades de encontrar cofres u objectos perdidos(incluyendo frutas)'
      },
      {
        name: 'Navegante',
        value: '🧭\nTendras menos posibilidades de perderte en el gran mar del One Piece\nY tendras muchas posibilidades de encontrar objetos al Zarpar\nY tendras un x2 de dinero'
      },
      {
        name: 'Cyborg',
        value: '🤖\nTendras +6 de Ataque, +8 de Defenza x Nivel'
      }
    )
    .setColor('RANDOM')
    .setFooter('Una vez que eliges el Rol No se puede cambiar')

    const embed2 = new Discord.MessageEmbed()
    .setAuthor(`Creacion De Personaje Para ${nombre}`)
    .setTitle('Seleciona tu Genero')
    .setDescription(`Reacciona para seleccionar el **Genero** de tu personaje **${nombre}**`)
    .addFields(
      {
        name: 'Hombre',
        value: '♂️'
      },
      {
        name: 'Mujer',
        value: '♀️'
      }
    )
    message.channel.send(embed2).then(m => {
      m.react('♂️')
      m.react('♀️')
      m.awaitReactions((reaction, user) => {
        const collector = m.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.id) && user.id == message.author.id, {
            time: 60000 * 6
          });
      if(message.author.id !== user.id) return;
      if(reaction.emoji.name === '♂️'){
        genero.push('Hombre')
        m.reactions.removeAll()
      }
      if(reaction.emoji.name === '♀️'){
       genero.push('Mujer')
       m.reactions.removeAll()
      }
      m.edit(embed1).then(msg =>{
        msg.react('901623144631128135')
        msg.react('906596039535001601')
        msg.react('🔍')
        msg.react('🔫')
        msg.react('🧭')
        msg.react('🤖')
  
        
        msg.awaitReactions((reaction, user) => {
          const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.id) && user.id == message.author.id, {
              time: 60000 * 6
            });
            

        if(message.author.id !== user.id) return;
        if(reaction.emoji.id === '901623144631128135'){
          rol.push(`${genero}`==='Mujer'?'<:SimboloHospital:901623144631128135> Doctora':'<:SimboloHospital:901623144631128135> Doctor')
        msg.reactions.removeAll()

          collector.stop()

        }
        if(reaction.emoji.id === '906596039535001601'){
          rol.push('<:espadachin:906596039535001601> Espadachin')
        msg.reactions.removeAll()

          collector.stop()


        }
        if(reaction.emoji.name === '🔍'){
          rol.push(`${genero}`==='Mujer'?'🔍 Arqueologa':'🔍 Arqueologo')
        msg.reactions.removeAll()

          collector.stop()


        }
        if(reaction.emoji.name === '🔫'){
          rol.push('🔫 Tirador')
        msg.reactions.removeAll()

          collector.stop()


        }
        if(reaction.emoji.name === '🧭'){
          rol.push('🧭 Navegante')
        msg.reactions.removeAll()

          collector.stop()


        }
        if(reaction.emoji.name === '🤖'){
          rol.push('🤖 Cyborg')
        msg.reactions.removeAll()

          collector.stop()

        }
        msg.reactions.removeAll()

        const embed = new Discord.MessageEmbed()
      .setTitle("Perfil Creado Con Exito")
      .setDescription(`${`${genero}` === 'Mujer'?'Bienvenida':'Bienvenido'} **${nombre}** Comienza Con Tu Aventura\nPuedes Visualizar Tu Perfil Con ` + "`op!perfil`")
      .setFooter('Para mas infomacion ponga `op!help`')
      .setColor("RANDOM")
      message.channel.send(embed)
      msg.delete()
      msg.reactions.removeAll()

      //base de datos

      

      perfil.establecer(`854572979353813032.${message.author.id}.crew`, {tripu: 0, nombre: "", id: ""})
      perfil.establecer(`854572979353813032.${message.author.id}.area`, {mar: mran, isla: isla, areas: "1", maxarea: 1})
      perfil.establecer(`854572979353813032.${message.author.id}.perfil`, {nombre: nombre, rol: `${rol}`,navegante: `${rol === '🧭 Navegante'?2:1}`, bio: "Sin Biografia", cname: 0, haki1: 0, haki2: 0, haki3: 0, genero: `${genero}`})
      perfil.establecer(`854572979353813032.${message.author.id}.progreso`, {nivel: 1, xp: 0 , maxp: 180, wanted: 0})
      perfil.establecer(`854572979353813032.${message.author.id}.estadisticas`, {energia: 20, maxenergia: 20,vida: 100, maxvida: 100, ataque: 0, defenza: 0})
      perfil.establecer(`854572979353813032.${message.author.id}.equipo`, {arma: 0, fruta: 0, barco: 0})
      perfil.establecer(`854572979353813032.${message.author.id}.money`, {dinero: 10000, banco: 0})
      inventario.establecer(`854572979353813032.${message.author.id}.comida`, {omusubi: 0, paleta: 0, carne: 0, gomitas: 0, sushi: 0, manzana: 0, mandarina: 0, galleta: 0, pez1: 0, pez2: 0, pez3: 0})
      inventario.establecer(`854572979353813032.${message.author.id}.frutas`, {suna: 0, hebi1: 0, doru: 0, gasha: 0, yomi: 0, baku: 0, tori2: 0, bara: 0, sube: 0, bomu: 0, kiro: 0, hana: 0, moku: 0, bato: 0, ope: 0, kage: 0, mera: 0, tori1: 0, sara1: 0, mochi: 0, horo: 0, bane: 0, hie: 0, pika: 0, magu: 0, numa: 0, doku: 0, nikyu: 0, uzu: 0, tokaan: 0, kumi: 0, utsu: 0, gol: 0, mini: 0, noro: 0, gomu: 0, gura: 0, yami: 0, awa: 0, ushi1: 0, ito: 0})
      
      inventario.establecer(`854572979353813032.${message.author.id}.cofres`, {comun: 0, raro: 0, epico: 0, hyper: 0, legendary: 0})
      inventario.establecer(`854572979353813032.${message.author.id}.cosas`, { ticket: 0, caña: 0, caña1: 0, caña2: 0, caña3: 0, caña4: 0, caña5: 0})
      inventario.establecer(`854572979353813032.${message.author.id}.inventarioi`, ['Sin Items'])
      inventario.establecer(`854572979353813032.${message.author.id}.inventarioc`, ['Sin Comidas'])
      cool.establecer(`854572979353813032.${message.author.id}.cooldown`, {diario: {tiene: 0, tiempo: 0, milis:0}, semanal: {tiene: 0, tiempo: 0, milis:0}, explorar: {tiene: 0, tiempo: 0, milis:0}, zarpar: {tiene: 0, tiempo: 0, milis:0}, pescar: {tiene: 0, tiempo: 0, milis:0}, entrenar:{tiene: 0, tiempo: 0, milis:0}})

   if(hak <= 3){
     perfil.establecer(`854572979353813032.${message.author.id}.perfil.haki3`, 1)
   }
   console.log(hak)









      })
      })
        
    })
    })
   
    
    

    
    
    
     
    
return
  }
     
  
  
  
  const embed = new Discord.MessageEmbed()
    .setDescription("Ya Tienes Un Perfil Creado.")
    .setColor("RANDOM")
    message.channel.send(embed)

  

  

 }

} 