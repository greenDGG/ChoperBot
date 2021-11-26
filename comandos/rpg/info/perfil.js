const Discord = require('discord.js');
const db = require('megadb');
const rpg = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')

module.exports = {
  name: "perfil", 
  alias: ["p"], 

async execute (client, message, args){
    let us = message.mentions.members.first() || message.member;
    let creado = await rpg.obtener(`854572979353813032.${us.id}.perfil`)


    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }


    let nivel = await rpg.obtener(`854572979353813032.${us.id}.progreso.nivel`)
    let xp = await rpg.obtener(`854572979353813032.${us.id}.progreso.xp`)
    let area = await rpg.obtener(`854572979353813032.${us.id}.area.isla`)
    let mar = await rpg.obtener(`854572979353813032.${us.id}.area.mar`)

    let maxarea = await rpg.obtener(`854572979353813032.${us.id}.area.maxarea`)
    let nose = await rpg.obtener(`854572979353813032.${us.id}.area.areas`)
    let ataque = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.ataque`)
    let defenza = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.defenza`)
    let vida = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.vida`)
    let maxvida = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.maxvida`)
    let arma = await rpg.obtener(`854572979353813032.${us.id}.equipo.arma`)
    let fruta = await rpg.obtener(`854572979353813032.${us.id}.equipo.fruta`)
    let barco = await rpg.obtener(`854572979353813032.${us.id}.equipo.barco`)
    let dinero = await rpg.obtener(`854572979353813032.${us.id}.money.dinero`)
    let banco = await rpg.obtener(`854572979353813032.${us.id}.money.banco`)
    let rol = await rpg.obtener(`854572979353813032.${us.id}.perfil.rol`)
    let eng = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.energia`)
    let meng = await rpg.obtener(`854572979353813032.${us.id}.estadisticas.maxenergia`)

    let bio = await rpg.obtener(`854572979353813032.${us.id}.perfil.bio`)
    let total = (dinero + banco)
    let wanted = await rpg.obtener(`854572979353813032.${us.id}.progreso.wanted`)

    let level = await rpg.obtener(`854572979353813032.${us.id}.progreso.maxp`)
    var porcentaje = (xp/level) * 100;
    var intporcentaje = Math.round(porcentaje)
    let qbarco;
    switch (barco){
        case 0:
            qbarco = 'Sin Barco'
            break 
        case 1:
            qbarco = 'Balsa'
            break;
        case 2:
            qbarco = 'Fusta'
            break; 
        case 3:
            qbarco = 'Goleta'
            break
        case 4:
            qbarco = 'Coca'
            break
        case 5:
            qbarco = 'Carabela'
            break 
        case 6:
            qbarco = 'Bergantín'
            break;
        case 7:
        qbarco = 'Carraca'
        break;  
        case 8:
            qbarco = 'Nao'
            break;
        case 9:
            qbarco = 'Galera'
            break; 
        case 10:
            qbarco = 'Balandra'
            break
        case 11:
            qbarco = 'Galeón'
            break
        case 12:
            qbarco = 'Corbeta'
            break 
        case 13:
            qbarco = 'Navío'
            break          

    }
    let qarma;
    switch (arma){
        case 0:
            qarma = 'Sin Arma'
            break;
        case 1:
        qarma = 'Kabuto'
        break;  
        case 2:
            qarma = 'Kogatana'
            break;

    }
    let qfruta;
    switch (fruta){
        case 36:
            qfruta = '<:itoito:885735925156577281> Ito Ito'
            break;
        case 35:
            qfruta = 'Hana Hana'
            break;
        case 34:
            qfruta = 'Bane Bane'
            break;
        case 33:
            qfruta = '<:nani:886480414112374824> Hie Hie'
            break;
        case 32:
            qfruta = '<:nani:886480414112374824> Pika Pika'
            break;
        case 31:
            qfruta = '<:nani:886480414112374824> Magu Magu'
            break;
        case 30:
            qfruta = '<:nani:886480414112374824> Numa Numa'
            break;
        case 29:
            qfruta = '<:nani:886480414112374824> Doku Doku'
            break;
        case 28:
            qfruta = '<:nani:886480414112374824> Nikyu Nikyu'
            break;
        case 0:
            qfruta = 'Sin Fruta'
            break;
        case 1:
        qfruta = '<:gomugomu:882282753519939584> Gomu Gomu'
        break;  
        case 2:
            qfruta = '<:meramera:882404943716290561> Mera Mera'
            break;
        case 3:
        qfruta = '<:guragura:885730778800082954> Gura Gura'
        break; 
        case 4:
            qfruta = '<:opeope:885731605673549834> Ope Ope'
            break;
        case 5:
            qfruta = '<:hitohito:885732137016385566> Hito Hito'
            break;
        case 6:
            qfruta = '<:barabara:882284030136025119> Bara Bara'
            break;
        case 7:
            qfruta = '<:yamiyami:882287207149346866> Yami Yami'
            break;
        case 8:
            qfruta = '<:awaawa:882286506570559519> Awa Awa'
            break;
        case 9:
            qfruta = '<:ushiushi:882286886268325988> Ushi Ushi'
            break;
        case 10:
        qfruta = 'Sara Sara'
        break;  
        case 11:
            qfruta = '<:itoito:885735925156577281> Ito Ito'
            break;
        case 12:
        qfruta = '<:mokumoku:885736818681729054> Moku Moku'
        break; 
        case 13:
            qfruta = '<:subesube:885737806138314833> Sube Sube'
            break;
        case 14:
            qfruta = '<:bakubaku:885738512761114664> Baku Baku'
            break;
        case 15:
            qfruta = '<:bomubomu:885739844276486165> Bomu Bomu'
            break;
        case 16:
            qfruta = '<:yomiyomi:885740617563512833> Yomi Yomi'
            break;
        case 17:
            qfruta = '<:kirokiro:885741345635971113> Kiro Kiro'
            break;
        case 18:
            qfruta = '<:gashagasha:885741801959477248> Gasha Gasha'
            break;
        case 19:
        qfruta = '<:dorudoru:885742541947940915> Doru Doru'
        break;  
        case 20:
            qfruta = '<:kagekage:885743175493369926> Kage Kage'
            break;
        case 21:
        qfruta = 'Hebi Hebi'
        break; 
        case 22:
            qfruta = 'Batto Batto'
            break;
        case 23:
            qfruta = 'Tori Tori'
            break;
        case 24:
            qfruta = 'Tori Tori'
            break;
        case 25:
            qfruta = 'Raito Raito'
            break;
        case 26:
            qfruta = '<:nani:886480414112374824> Mochi Mochi'   
            break; 
        case 27:
            qfruta = '<:nani:886480414112374824> Horo Horo'
            break;
        
           

    }
    
   

let xx = [];
let xd = [];
await Promise.all(
    client.guilds.cache.map(guild => { 
    client.guilds.cache.get(`${guild.id}`).members.cache.map(async(member) =>{
        let id = member.id;
        
        let nick = id
        let bal = await rpg.obtener(`854572979353813032.${id}.progreso.nivel`);
        
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
            
            let nick = id
            let bal = await rpg.obtener(`854572979353813032.${id}.progreso.nivel`);
            
            if ((!bal || bal === NaN || null)) return;
        
           
                xd.shift(id)
               
                
                
                
            })
        })
        );
  
    let xy = xx.sort((a, b) => b.data - a.data);

    var rank = "";
    for (var i in xy) {
        let path = '🔹';
        let ind = xy.indexOf(xy[i]) + 1
        if(xy[i].ID === us.id){rank += `${ind}`}
        

        
    } 
    

    
    const embed = new Discord.MessageEmbed()
    .setTitle(`${rol}`)
    .addFields(
        
        
        {
            name: "PROGRESO",
            value: `**Nivel**: ${nivel} (${intporcentaje}%)\n**XP**: ${xp.toLocaleString('en-US')}/${level.toLocaleString('en-US')}\n**Isla**: ${area} (${mar}) (Isla: ${nose} Max: ${maxarea})\n**Wanted**: <:berri:907114454108491806>${wanted.toLocaleString('en-US')}`
        },
        {
            name: "ESTADÍSTICAS",
            value: `🗡️ **AT:** ${ataque}\n🛡️ **DEF: **${defenza}\n❤️ **VIDA:** ${vida}/${maxvida}\n⚡ **Energia:** ${eng}/${meng}`
        },
        {
            name: "EQUIPO",
            value: `${qarma}\n${qfruta}\n${qbarco}`,
            inline: true
        },
        {
            name: "DINERO",
            value: `**Berries:** <:berri:907114454108491806> ${dinero.toLocaleString('en-US')}\n**Guardado:** <:berri:907114454108491806> ${banco.toLocaleString('en-US')}\n**Total:** <:berri:907114454108491806> ${total.toLocaleString('en-US')}`,
            inline: true
        },
        {
            name: "BIOGRAFIA",
            value: "```" + `${bio}` + "```"
        }
    )
    .setAuthor(`${await rpg.obtener(`854572979353813032.${us.id}.perfil.nombre`)} Perfil`, us.user.displayAvatarURL())
    .setThumbnail(us.user.displayAvatarURL({dynamic : true}))
    .setColor("#5000a5")
    .setFooter(`RANK: ${rank}`)
   
    
    
   

    message.channel.send(embed)
 }

} 