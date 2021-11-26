const Discord = require('discord.js');
const db = require("megadb")
const rank = new db.crearDB('ranking', 'rpg')

const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
module.exports = {
  name: "top", 
  alias: [""], 
  
async execute (client, message, args){
    const otros = args.join(' ')
    if(`${otros}` === 'bountry'){
        message.channel.send('bountry proximamente')
    }
    
  
    let xx = [];
    let xd = [];
    await Promise.all(
        client.guilds.cache.map(guild => { 
        client.guilds.cache.get(`${guild.id}`).members.cache.map(async(member) =>{
            let id = member.id;
            
            let nick = await perfil.obtener(`854572979353813032.${id}.perfil.nombre`) || member.user.tag;
            let bal1 = await perfil.obtener(`854572979353813032.${id}.money.banco`);
            let bal2 = await perfil.obtener(`854572979353813032.${id}.money.dinero`);
            let bal = (bal2 + bal1)
            if ((!bal || bal === NaN || null)) return;
        
            let ak = xd.includes(id)
            if(ak === true){return}
            if(ak === false){
                xd.push(id)

               
                
                xx.push({ data: bal, ID: `${nick}` });
                
                
                
                
                ;}
            })
        })
        );///
        await Promise.all(
            client.guilds.cache.map(guild => { 
            client.guilds.cache.get(`${guild.id}`).members.cache.map(async(member) =>{
                let id = member.id;
                
                let nick = await perfil.obtener(`854572979353813032.${id}.perfil.nombre`) || member.user.tag;
                let bal1 = await perfil.obtener(`854572979353813032.${id}.money.banco`);
                let bal2 = await perfil.obtener(`854572979353813032.${id}.money.dinero`);
                let bal = (bal2 + bal1)
                if ((!bal || bal === NaN || null)) return;
            
               
                    xx.shift(id)
                   
                    
                    
                    
                })
            })
            );
      
        let xy = xx.sort((a, b) => b.data - a.data);
        if (xy.lenght < 1) return message.reply('No rich people here -_-');
        xy.length = 10;
    
        var final = "";
        for (var i in xy) {
            let path = '🔹';
            let ind = xy.indexOf(xy[i]) + 1;
            if (ind == 1) path = '1';
            else if (ind == 2) path = '2';
            else if (ind == 3) path = '3';
            else if (ind == 4) path = '4';
            else if (ind == 5) path = '5';
            else if (ind == 6) path = '6';
            else if (ind == 7) path = '7';
            else if (ind == 8) path = '8';
            else if (ind == 9) path = '9';
            else if (ind == 10) path = '10';

            final += `${path}. <:berri:907114454108491806>**${xy[i].data.toLocaleString('en-US')}** - ${xy[i].ID}\n`
        } 
       
    const embed = new Discord.MessageEmbed()
    .setTitle('RANKING GLOBAL(BERRIES)')
    .setDescription(final)
    .setColor("RANDOM")
message.channel.send(embed)
  

 }

} 