const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')



module.exports = {
  name: "open", 
  alias: [""], 

async execute (client, message, args){

    let cuanto = args[2]

    var cofres = [cuanto?`cofre comun ${cuanto}`:'cofre comun', 'cofre raro', 'cofre epico', 'cofre hyper', 'cofre legendary']
    let cof = args.join(' ')
    let co = cofres.includes(`${cof}`)

    
    if(!cof){
        message.channel.send('Necesitas decirme que cofre deseas abrir...')
        return
    }
    if(co === true){
        let c;
        let ab;
        let berri;
        let ex;
        switch (cof){
            case 'cofre legendary':
                c = 'legendary',
                ab = '<:cofrelegendario:890255198520492072> Cofre Legendary Abierto.'
                berri = (Math.floor(Math.random() * 100000000)) + 1
                break;
            case 'cofre hyper':
                c = 'hyper',
                ab = '<:cofrehyper:890255128827928616> Cofre Hyper Abierto.'
                berri = (Math.floor(Math.random() * 10000000)) + 1
                break;
            case 'cofre epico':
                c = 'epico',
                ab = '<:cofreepico:890255074419413032> Cofre Epico Abierto.',
                berri = (Math.floor(Math.random() * 1000000)) + 1
                break;
            case 'cofre raro':
                c = 'raro',
                ab = '<:cofreraro:890255268611518495> Cofre Raro Abierto.',
                berri = (Math.floor(Math.random() * 100000)) + 1
                break;
            case cuanto?`cofre comun ${cuanto}`:'cofre comun':
                c = 'comun',
                ab = cuanto?`Has abierto ${cuanto} <:cofrecomun:890255012138205255> Cofre Comúnes`:'<:cofrecomun:890255012138205255> Cofre Comun Abierto.'
                berri = (Math.floor(Math.random() * 2000)) + 7000
                ex = '**<:cofrecomun:890255012138205255> Cofre Común**: '
                
                break;
        }

        let berri2 = (Math.floor(Math.random() * 2000)) + 7000 * cuanto
        let tiene = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.${c}`)
        if(tiene === 0){
            message.channel.send('No tienes este cofre en tu inventario...')
            return
        }

        const embed = new Discord.MessageEmbed()
       .setAuthor(`${await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)} Cofres`, message.member.user.displayAvatarURL())
       .setDescription(`**${ab}**\n<:berri:907114454108491806>${cuanto?berri2.toLocaleString('en-US'):berri.toLocaleString('en-US')}`)
       .setColor("RANDOM")
        
        message.channel.send(embed)
        inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `${ex}${tiene}`)
        perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, cuanto?berri2:berri)
        inventario.restar(`854572979353813032.${message.author.id}.cofres.${c}`, cuanto?cuanto:1)

        let tiene2 = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.${c}`)
        if(tiene2 != 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `${ex}${tiene2}`)}


        

        return
    }
   message.channel.send('No e podido encontrar ese cofre')

 }

} 