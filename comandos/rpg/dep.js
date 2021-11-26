const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "dep", 
  alias: ["depositar", "guardar"], 
  
async execute (client, message, args){

    const user = message.author;
    const vn = args.join(' ')

    const din = await perfil.obtener(`854572979353813032.${user.id}.money.dinero`);
    
    
    let crw = await perfil.obtener(`854572979353813032.${user.id}.crew.tripu`);
    let barco = await perfil.obtener(`854572979353813032.${user.id}.equipo.barco`);
    let creado = await perfil.obtener(`854572979353813032.${message.author.id}.perfil`)
    let id = await perfil.obtener(`854572979353813032.${user.id}.crew.id`)
    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }

    if(crw === 1){

        if(message.content.slice(vn.length + 6) === 'k' || message.content.slice(vn.length + 6) ===  'm' || message.content.slice(vn.length + 6) ===  'b'){
            let añadir;
            let depa;
            switch(message.content.slice(vn.length + 6)){
                case 'b':
                    añadir = '000000000'
                    depa = '000000000'
                    break;
                case 'm':
                    añadir = '000000'
                    depa = '000000'
                    break;
                case 'k':
                    añadir = '000'
                    depa = '000'
                    break;
            }
    
            
           
            if(isNaN(vn.slice(0, vn.length - 1))){
                let solonumeros = new Discord.MessageEmbed()
                
                .setDescription(" `Pon la cantidad que quieres depositar...`")
                .setColor("RANDOM")
                
                return message.channel.send(solonumeros)
            }
            if(vn.slice(0, vn.length - 1) + depa > din){
                let nomayorque = new Discord.MessageEmbed()
                
                .setDescription(" `No puedes depositar mas de lo que tienes`")
                .setColor('RANDOM')
                
                return message.channel.send(nomayorque)
            }
    
            perfil.sumar(`854572979353813032.${user.id}.money.banco`, vn.slice(0, vn.length - 1) + depa);
            crew.sumar(`854572979353813032.${id}.tripulacion.dinero`, vn.slice(0, vn.length - 1) + depa);
            perfil.restar(`854572979353813032.${user.id}.money.dinero`, vn.slice(0, vn.length - 1) + depa);
    
            let t = (vn.slice(0, vn.length - 1) + añadir)
            let tt = Math.abs(t)
            let embed = new Discord.MessageEmbed()
        
        .setDescription(`Has guardaro <:berri:907114454108491806>${tt.toLocaleString('en-US')} Berris`)
        .setColor("RANDOM")
        return message.channel.send(embed)
            
        }
        
    
        if(args[0] == 'all'){
            if(din == 0){
                message.channel.send("No Tienes Dinero Para Depositar...")
                return
            }
            perfil.sumar(`854572979353813032.${user.id}.money.banco`, din)
            crew.sumar(`854572979353813032.${id}.tripulacion.dinero`, din)

            
    
            let embeda = new Discord.MessageEmbed()
            .setDescription(`Has guardado <:berri:907114454108491806>${din.toLocaleString('en-US')} Berris`)
            .setColor("RANDOM")
            message.channel.send(embeda)
            perfil.restar(`854572979353813032.${user.id}.money.dinero`, din)
        
        return
    
        }
        if(isNaN(args[0])){
            let solonumeros = new Discord.MessageEmbed()
            
            .setDescription(" `Pon la cantidad que quieres depositar...`")
            .setColor("RANDOM")
            
            return message.channel.send(solonumeros)
        }
    
    
        if(args[0] > din){
            let nomayorque = new Discord.MessageEmbed()
            
            .setDescription(" `No puedes depositar mas de lo que tienes`")
            .setColor('RANDOM')
            
            return message.channel.send(nomayorque)
        }
    
    
        perfil.sumar(`854572979353813032.${user.id}.money.banco`, args[0]);
        crew.sumar(`854572979353813032.${id}.tripulacion.dinero`, args[0]);
        perfil.restar(`854572979353813032.${user.id}.money.dinero`, args[0]);
    
        var md = Math.abs(args[0])
        let embed = new Discord.MessageEmbed()
        
        .setDescription(`Has guardado <:berri:907114454108491806>${md.toLocaleString('en-US')} Berris`)
        .setColor("RANDOM")
        return message.channel.send(embed)
    }

    if(barco > 0){
        if(message.content.slice(vn.length + 6) === 'k' || message.content.slice(vn.length + 6) ===  'm' || message.content.slice(vn.length + 6) ===  'b'){
            let añadir;
            let depa;
            switch(message.content.slice(vn.length + 6)){
                case 'b':
                    añadir = '000000000'
                    depa = '000000000'
                    break;
                case 'm':
                    añadir = '000000'
                    depa = '000000'
                    break;
                case 'k':
                    añadir = '000'
                    depa = '000'
                    break;
            }
    
            
           
            if(isNaN(vn.slice(0, vn.length - 1))){
                let solonumeros = new Discord.MessageEmbed()
                
                .setDescription(" `Pon la cantidad que quieres depositar...`")
                .setColor("RANDOM")
                
                return message.channel.send(solonumeros)
            }
            if(vn.slice(0, vn.length - 1) + depa > din){
                let nomayorque = new Discord.MessageEmbed()
                
                .setDescription(" `No puedes depositar mas de lo que tienes`")
                .setColor('RANDOM')
                
                return message.channel.send(nomayorque)
            }
    
            perfil.sumar(`854572979353813032.${user.id}.money.banco`, vn.slice(0, vn.length - 1) + depa);
            perfil.restar(`854572979353813032.${user.id}.money.dinero`, vn.slice(0, vn.length - 1) + depa);
    
            let t = (vn.slice(0, vn.length - 1) + añadir)
            let tt = Math.abs(t)
            let embed = new Discord.MessageEmbed()
        
        .setDescription(`Se han depositado <:berri:907114454108491806>${tt.toLocaleString('en-US')} Berris`)
        .setColor("RANDOM")
        return message.channel.send(embed)
            
        }
        
    
        if(args[0] == 'all'){
            if(din == 0){
                message.channel.send("No Tienes Dinero Para Depositar...")
                return
            }
            perfil.sumar(`854572979353813032.${user.id}.money.banco`, din)
            
    
            let embeda = new Discord.MessageEmbed()
            .setDescription(`Se han depositado <:berri:907114454108491806>${din.toLocaleString('en-US')} Berris`)
            .setColor("RANDOM")
            message.channel.send(embeda)
            perfil.restar(`854572979353813032.${user.id}.money.dinero`, din)
        
        return
    
        }
        if(isNaN(args[0])){
            let solonumeros = new Discord.MessageEmbed()
            
            .setDescription(" `Pon la cantidad que quieres depositar...`")
            .setColor("RANDOM")
            
            return message.channel.send(solonumeros)
        }
    
    
        if(args[0] > din){
            let nomayorque = new Discord.MessageEmbed()
            
            .setDescription(" `No puedes depositar mas de lo que tienes`")
            .setColor('RANDOM')
            
            return message.channel.send(nomayorque)
        }
    
    
        perfil.sumar(`854572979353813032.${user.id}.money.banco`, args[0]);
        perfil.restar(`854572979353813032.${user.id}.money.dinero`, args[0]);
    
        var md = Math.abs(args[0])
        let embed = new Discord.MessageEmbed()
        
        .setDescription(`Se han depositado <:berri:907114454108491806>${md.toLocaleString('en-US')} Berris`)
        .setColor("RANDOM")
        return message.channel.send(embed)
    }
    message.channel.send('Necesitas un barco para guardar el dinero')
 

  

 }

} 