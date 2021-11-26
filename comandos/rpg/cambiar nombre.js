const Discord = require('discord.js');
const db = require('megadb');
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const rpg = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "cambiar nombre", 
  alias: ["cnombre", "cname"], 

async execute (client, message, args){
    let creado = await rpg.obtener(`854572979353813032.${message.author.id}.perfil`)
    let max3 = await rpg.obtener(`854572979353813032.${message.author.id}.perfil.cname`)
    let nombre = args.join(' ')
    let name = await rpg.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
    let id = await rpg.obtener(`854572979353813032.${message.author.id}.crew.id`)
    let cre = await rpg.obtener(`854572979353813032.${message.author.id}.crew.tripu`)



    
    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }
    if(max3 == 3){
        message.channel.send("Lo siento pero ya no puedes cambiar mas tu nombre.")
        return
    }


    if(!nombre){
        message.channel.send("Di el nombre por cual te quieras cambiar.")
        return
    }
    
    

    rpg.establecer(`854572979353813032.${message.author.id}.perfil.nombre`, nombre)
    rpg.sumar(`854572979353813032.${message.author.id}.perfil.cname`, 1)
    
   

    message.channel.send(`Nombre Cambiado por ${nombre} con exito`)
    if(cre === 1){

    crew.extract(`854572979353813032.${id}.tripulacion.tripu`, name)
    crew.push(`854572979353813032.${id}.tripulacion.tripu`, nombre)


    }

 }

} 