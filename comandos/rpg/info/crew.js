const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const crew = new db.crearDB("crews", 'rpg')
const barcodb = new db.crearDB('barco', 'rpg')

module.exports = {
  name: "crew", 
  alias: [""], 
  
async execute (client, message, args){
    let uno = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let dos = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let tres = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let cuatro = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let cinco = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let seis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let siete = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let ocho = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let nueve = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let runo = [Math.floor(Math.random() * uno.length)]
    let rdos = [Math.floor(Math.random() * dos.length)]
    let rtres = [Math.floor(Math.random() * tres.length)]
    let rcuatro = [Math.floor(Math.random() * cuatro.length)]
    let rcinco = [Math.floor(Math.random() * cinco.length)]
    let rseis = [Math.floor(Math.random() * seis.length)]
    let rsiete = [Math.floor(Math.random() * siete.length)]
    let rocho = [Math.floor(Math.random() * ocho.length)]
    let rnueve = [Math.floor(Math.random() * nueve.length)]
    let us = message.mentions.members.first() || message.member;


    


    

    let creado = await perfil.obtener(`854572979353813032.${us.id}.perfil`)
    if(`${creado}` == 'undefined'){
        message.channel.send('Parece que no tienes un perfil para la aventura :(\nCrea un perfil usando `op!crear`')
        return
        
    }

 
    let tripulacion = await perfil.obtener(`854572979353813032.${us.id}.crew.tripu`)

    let funcion = args[0]
    if(funcion == "crear"){
        if(tripulacion == 1){
            message.reply("Ya Estas En Una Tripulación")
            return
        }
        let barco = await perfil.obtener(`854572979353813032.${message.author.id}.progreso.barco`)
        if(barco === 0){return message.channel.send('Necesitas Tener Un Barco Para Crear Una Tripulación.')}
        let cju = await barcodb.obtener(`854572979353813032.${message.author.id}.barco.maxjugadores`)
        let at = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.ataque`)
        let def = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.defenza`)
        let nombre = args.join(' ').slice(6);
        if(!nombre){
            message.reply("No Has Puesto Un Nombre Para La Tripulación...")
            return
        }
        let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
        const embed = new Discord.MessageEmbed()
        .setDescription(`Tripulación **${nombre}** A Sido Creada Con Exito.`)
        .setColor("RANDOM")
        message.channel.send(embed)
        crew.establecer(`854572979353813032.${runo}${rdos}${rtres}${rcuatro}${rcinco}${rseis}${rsiete}${rocho}${rnueve}.tripulacion`, {nombre: nombre, nivel: 0, bandera: 0, ba: "", xp: 0,maxp: 300, jugadores: 1,maxju: cju, estad:{at: at, def: def}, id: runo + rdos + rtres + rcuatro + rcinco + rseis + rsiete + rocho + rnueve, tripu: [name], owner: message.author.id})
        perfil.establecer(`854572979353813032.${message.author.id}.crew.tripu`, 1)
        perfil.establecer(`854572979353813032.${message.author.id}.crew.nombre`, nombre)
        perfil.establecer(`854572979353813032.${message.author.id}.crew.id`, runo + rdos + rtres + rcuatro + rcinco + rseis + rsiete + rocho + rnueve)
        return
    }

    if(funcion == "invitar"){
      
        
        const player1 = message.author
        const usuario = message.mentions.users.firstKey()
        const colector = message.channel.createMessageCollector(m => m.author.id === usuario)
        let id = await perfil.obtener(`854572979353813032.${player1.id}.crew.id`)
        let nombre = await perfil.obtener(`854572979353813032.${player1.id}.crew.nombre`)
        let tripulacio = await perfil.obtener(`854572979353813032.${usuario}.crew.tripu`)
        let tiene = await perfil.obtener(`854572979353813032.${usuario}.perfil`)
        let ids = await perfil.obtener(`854572979353813032.${usuario}.crew.id`)
        let name = await perfil.obtener(`854572979353813032.${usuario}.perfil.nombre`)
        if(!usuario){return message.channel.send('Menciona a alguien')}
        if(`${tiene}` == 'undefined'){
            message.channel.send("Este Usuario No Tiene Un Perfil Creado.")
            return
        }

        if(player1.id === usuario) return message.channel.send("No seas pendejo y no te invites a ti mismo ._.")
        if(tripulacio == 1){
            message.reply("Este Usuario Ya Tiene Una Tripulación")
            return
        }

        colector.on('collect', async(msg) => {
            if(msg.content == "si"){
                let at = await perfil.obtener(`854572979353813032.${usuario}.estadisticas.ataque`)
                let def = await perfil.obtener(`854572979353813032.${usuario}.estadisticas.defenza`)

                msg.channel.send(`${player1}, <@${usuario}> Ha Aceptado Su Invitación.`)
                perfil.establecer(`854572979353813032.${usuario}.crew.tripu`, 1)
                perfil.establecer(`854572979353813032.${usuario}.crew.nombre`, nombre)
                perfil.establecer(`854572979353813032.${usuario}.crew.id`, id)
                crew.sumar(`854572979353813032.${id}.tripulacion.jugadores`, 1)
                crew.push(`854572979353813032.${id}.tripulacion.tripu`, name)
                crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at)
                crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def)




                
                colector.stop();
                return
            }
            if(msg.content == "no"){
                msg.channel.send(`${player1}, <@${usuario}> No Se Quiere Unir A Tu Tripulación.`)
                colector.stop(); 
                return
            }
        })
        

          
        message.channel.send(`<@${usuario}>, ${player1} Te Ha Invitado A Su Tripulación\n` + "**Si:** Para Aceptar\n**No:** Para Rechazar")
        return
    }
    if(tripulacion == 0){
        message.reply('No tienes una tripulación\nCrea uno con `op!crew crear [nombre de la tripulación] o recibe una invitación de un líder de la tripulación`')
        return
        
    }
    if(funcion == "bandera"){

        const player1 = message.author
        let id = await perfil.obtener(`854572979353813032.${player1.id}.crew.id`)
        
        let name = await crew.obtener(`854572979353813032.${id}.tripulacion.bandera`)
        let nombre = await perfil.obtener(`854572979353813032.${player1.id}.crew.nombre`)
        let img = await crew.obtener(`854572979353813032.${id}.tripulacion.ba`)
        
        if(name === 0){
            message.channel.send("Parece Que No Tienes Bandera\nDeseas Poner Una?\nSi/No")
            const player1 = message.author

            
            
            const colector = message.channel.createMessageCollector(m => m.author.id === player1.id)
           
            colector.on('collect', (msg) => {
                if(msg.content == "si"){
    
                    message.channel.send("Envia La Imagen Que Quieras Poner Como Bandera.")
                    const colecto = message.channel.createMessageCollector(m => m.author.id === player1.id)
                    colecto.on('collect', (ms) =>{
                        if (ms.attachments.size > 0) {
                            if (ms.attachments.every(attachIsImage)){
                               
                            }
                        }
                        function attachIsImage(msgAttach) {
                            var url = msgAttach.url;
                            
                           
                            
                        
                        if(url.endsWith('.png')){

                            crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                            crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                            message.channel.send('Imagen Añadida Con Exito.')
                            colecto.stop();
                            return
                        }
                        if(url.endsWith('.jpg')){
                            crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                            crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                            message.channel.send('Imagen Añadida Con Exito.')
                            colecto.stop();
                            return
                        }
                        if(url.endsWith('.gif')){
                            crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                            crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                            message.channel.send('Imagen Añadida Con Exito.')
                            colecto.stop();
                            return
                        }
                        message.channel.send("No e podido indentificar la imagen... recuerda que tiene que ser un archivo '.png, .jpg, .gif'.")
                        colecto.stop();
                    }
                        
                        
                        
                    })
                    
                    
    
    
                    
                    colector.stop();
                    return
                }
                if(msg.content == "no"){
                    msg.channel.send(`Ok...`)
                    colector.stop(); 
                    return
                }
            })
            return
        } 
        const embed = new Discord.MessageEmbed()
        .setTitle(`${nombre} Bandera`)
        .setImage(`${img}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        message.channel.send('Deseas eliminar o cambiar la bandera? | Eliminar/Cambiar')
        const col = message.channel.createMessageCollector(m => m.author.id === player1.id)
        col.on("collect", (msg) => {
            
            if(msg.content == "eliminar"){
                crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 0)
                crew.establecer(`854572979353813032.${id}.tripulacion.ba`, "")
                message.channel.send('La Bandera Ha Sido Eliminada')

        }
        if(msg.content == "cambiar"){
            
            message.channel.send("Envia La Imagen Por La Que Quiras Cambiar La Bandera.")
            const colecto = message.channel.createMessageCollector(m => m.author.id === player1.id)
            colecto.on('collect', (ms) =>{
                if (ms.attachments.size > 0) {
                    if (ms.attachments.every(attachIsImage)){
                       
                    }
                }
                function attachIsImage(msgAttach) {
                    var url = msgAttach.url;
                    
                   
                    
                
                if(url.endsWith('.png')){

                    crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                    crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                    message.channel.send('Imagen Cambiada Con Exito.')
                    colecto.stop();
                    return
                }
                if(url.endsWith('.jpg')){
                    crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                    crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                    message.channel.send('Imagen Cambiada Con Exito.')
                    colecto.stop();
                    return
                }
                if(url.endsWith('.gif')){
                    crew.establecer(`854572979353813032.${id}.tripulacion.bandera`, 1)
                    crew.establecer(`854572979353813032.${id}.tripulacion.ba`, `${url}`)
                    message.channel.send('Imagen Cambiada Con Exito.')
                    colecto.stop();
                    return
                }
                message.channel.send("No e podido indentificar la imagen... recuerda que tiene que ser un archivo '.png, .jpg, .gif'.")
                colecto.stop();
            }
                
                
                
            })
            
            


            
            colector.stop();
            return
            

    }
        })

        return
        
        
    }
    if(funcion == "info"){
        message.channel.send('Comando No Disponible...')
        return
    }
    if(funcion == "eliminar"){
        let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
        let owner = await crew.obtener(`854572979353813032.${id}.tripulacion.owner`)
        let nam = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        const player1 = message.author


        if(player1.id != owner){

            message.channel.send('Solo El Owner Puede Eliminar El Crew')
            return
        }


        const colector = message.channel.createMessageCollector(m => m.author.id === player1.id)
        message.channel.send(`**${name}**, ¿Estás seguro de que quieres eliminar a tu Tripulacion?` + "`si/no`" +``)
        colector.on('collect', (msg) => {
            if(msg.content == "si"){

                msg.channel.send(`**${nam}**, Ha sido eliminado con exito.`)
                crew.eliminar(`854572979353813032.${id}`)
                
                colector.stop();
                return
            }
            if(msg.content == "no"){
                msg.channel.send(`:)`)
                colector.stop(); 
                return
            }
        })
        return
    }
    
    if(funcion == "kick"){
        const usuario = message.mentions.users.firstKey()
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
        let autor = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
        let name = await perfil.obtener(`854572979353813032.${usuario}.perfil.nombre`)
        let tri = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        let trp = await crew.obtener(`854572979353813032.${id}.tripulacion.tripu`)
        let tps = await crew.obtener(`854572979353813032.${id}.tripulacion.tripuc`)
        let owner = await crew.obtener(`854572979353813032.${id}.tripulacion.owner`)
        if(!usuario){
            message.channel.send("Debes @mencionar a la persona que quieres sacar...")
            return
        }
        

        if(usuario == message.author.id){
            message.channel.send(`**${name}** no puedes expulsarte a ti mismo!!`)
            return
        }

        message.channel.send(`**${autor}**, ha expulsado a **${name}** de **${tri}**`)

        crew.restar(`854572979353813032.${id}.tripulacion.jugadores`, 1)
        crew.extract(`854572979353813032.${id}.tripulacion.tripu`, name)
        perfil.establecer(`854572979353813032.${usuario}.crew.tripu`, 0)
        perfil.establecer(`854572979353813032.${usuario}.crew.nombre`, '')
        perfil.establecer(`854572979353813032.${usuario}.crew.id`, '')
        return
    }
    if(funcion == "salir"){
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
        let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
        let tripu = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        let trp = await crew.obtener(`854572979353813032.${id}.tripulacion.tripu`)
        let tps = await crew.obtener(`854572979353813032.${id}.tripulacion.tripuc`)
        let owner = await crew.obtener(`854572979353813032.${id}.tripulacion.owner`)
        
        const player1 = message.author

        if(player1.id == owner){
            message.channel.send(`**${name}** no puedes dejar tu propia tripulacion!!`)
            return
        }
        
        const colector = message.channel.createMessageCollector(m => m.author.id === player1.id)
        message.channel.send(`**${name}** Estas Seguro Que Quieres Abandonar A Tus Nakamas? ` + "`Si/No`" +``)
        colector.on('collect', (msg) => {
            if(msg.content == "si"){

                msg.channel.send(`Que mal, **${name}** ha abandonado **${tripu}**.`)
                crew.restar(`854572979353813032.${id}.tripulacion.jugadores`, 1)
                crew.extract(`854572979353813032.${id}.tripulacion.tripu`, name)
                perfil.establecer(`854572979353813032.${message.author.id}.crew.tripu`, 0)
                perfil.establecer(`854572979353813032.${message.author.id}.crew.nombre`, '')
                perfil.establecer(`854572979353813032.${message.author.id}.crew.id`, '')
                
                


                
                colector.stop();
                return
            }
            if(msg.content == "no"){
                msg.channel.send(`:)`)
                colector.stop(); 
                return
            }
        })
        


        return
    }
    if(funcion == "lista"){
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
        var lista = await crew.obtener(`854572979353813032.${id}.tripulacion.tripu`)
        let name = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        let capi = await crew.obtener(`854572979353813032.${id}.tripulacion.owner`)
        let capia = await perfil.obtener(`854572979353813032.${capi}.perfil.nombre`)

        
        const embed = new Discord.MessageEmbed()
        .setTitle(`${name} Nakamas`)
        .setDescription(`**${lista.join('\n')}**`)
        .setFooter(`Capitan: ${capia}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        return
    }
    if(funcion == "alianza"){
        let us = args[1]
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)

        let ali = await crew.obtener(`854572979353813032.${id}.tripulacion.alianza.tiene`)
        if(!us){


            if(ali === 0){
                message.channel.send("Parece que no tienes alianza todavia...\npon `op!crew alianza <ID del crew>` para hacer una alianza")

            }
            
            let aas = await crew.obtener(`854572979353813032.${id}.tripulacion.alianza.aliaid`)
            aas.forEach(async(obj) =>{
                let xx = [];
                let name = await crew.obtener(`854572979353813032.${obj}.tripulacion.nombre`)
                xx.push({ ID: name, data: obj })
                
                let xy = xx.sort((a, b) => b.data - a.data);
                    
                        var final = "";
                        for (var i in xy) {
                            
                            let ind = xy.indexOf(xy[i]) + 1;
                            
                
                            final += `**${xy[i].data.toLocaleString('en-US')}** -- ${xy[i].ID}\n`
                        } 
            const embed = new Discord.MessageEmbed()
            .setTitle('Alianzas')
            .setDescription(final)
            message.channel.send(embed)
              })
              
            return
        }
        if(us === 'aceptar'){
            let soli = await crew.obtener(`854572979353813032.${id}.tripulacion.alianza.soli`)
            if(!args[2]) return message.channel.send('Necesitas Decir el ID de la alianza que quieres aceptar')
            let s = soli.includes(args[2])
            if(s === true){
                let usid = await crew.obtener(`854572979353813032.${args[2]}.tripulacion.owner`)
                let cr7 = await perfil.obtener(`854572979353813032.${usid}.perfil.nombre`)
                let idas = await perfil.obtener(`854572979353813032.${usid}.crew.id`)

                message.channel.send('Has Aceptado la solicitud de alianza de ' + `**${cr7}**`)
                crew.extract(`854572979353813032.${id}.tripulacion.alianza.soli`, args[2])
                crew.establecer(`854572979353813032.${idas}.tripulacion.alianza.pend`, 0)
                crew.establecer(`854572979353813032.${idas}.tripulacion.alianza.idp`, "")
                crew.establecer(`854572979353813032.${idas}.tripulacion.alianza.tiene`, 1)
                crew.establecer(`854572979353813032.${id}.tripulacion.alianza.tiene`, 1)
                crew.push(`854572979353813032.${id}.tripulacion.alianza.aliaid`, args[2])
                crew.push(`854572979353813032.${idas}.tripulacion.alianza.aliaid`, args[2])

                
                return

            }
            if(s === false){message.channel.send('No e encontrado ' + args[2] + ' En las solicitudes')}
            return
}
        if(us === 'rechazar'){
            let solis = await crew.obtener(`854572979353813032.${id}.tripulacion.alianza.soli`)
            if(!args[2]) return message.channel.send('Necesitas Decir el ID de la alianza que quieres rechazar')

            let s = solis.includes(args[2])

            if(s === true ){

                let idas = await perfil.obtener(`854572979353813032.${usid}.crew.id`)

                message.channel.send('Has Rechazado la solicitud de alianza de ' + cr7)

            crew.extract(`854572979353813032.${id}.tripulacion.alianza.soli`, args[2]) 
            let usid = await crew.obtener(`854572979353813032.${args[2]}.tripulacion.owner`)
            let cr7 = await perfil.obtener(`854572979353813032.${usid}.perfil.nombre`)
            crew.establecer(`854572979353813032.${idas}.tripulacion.alianza.pend`, 0)
                crew.establecer(`854572979353813032.${idas}.tripulacion.alianza.idp`, "")
            
            }
            if(s === false){message.channel.send('No e encontrado ' + args[2] + ' En las solicitudes')}
            
            
        return
    }
        let cr = await crew.obtener(`854572979353813032.${us}`)
        if(cr === undefined){
            message.channel.send('No e encontrado La tipulacion con el Id ' + us)
            return
        }

        let ownerid = await crew.obtener(`854572979353813032.${us}.tripulacion.owner`)
        let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
        let crn = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        let cra = await crew.obtener(`854572979353813032.${us}.tripulacion.nombre`)


        let owner = await perfil.obtener(`854572979353813032.${ownerid}.perfil.nombre`)
        client.users.cache.get(ownerid).send(`**${owner}**, **${name}** Capitan de **${crn}** a pedido formar una alianza con **${cra}**\nVe a un servidor y pon `+"`op!crew alianza aceptar "+`${id}`+"`"+` Para aceptar.\nPara rechazar pon `+"`op!crew alianza rechazar "+`${id}`+"`"+``)
        message.channel.send(`La solicitud de alianza a sido enviada con exito!`)
        crew.push(`854572979353813032.${us}.tripulacion.alianza.soli`, id)
        crew.establecer(`854572979353813032.${id}.tripulacion.alianza.pend`, 1)
        crew.establecer(`854572979353813032.${id}.tripulacion.alianza.idp`, us)

        
        return
    }
    if(funcion == "ranking"){
        let xx = [];
        let xd = [];
        await Promise.all(
            client.guilds.cache.map(guild => { 
            client.guilds.cache.get(`${guild.id}`).members.cache.map(async(member) =>{
                let id = member.id;
                let idse = await perfil.obtener(`854572979353813032.${id}.crew.id`)
                

                let bal2 = await crew.obtener(`854572979353813032.${idse?idse:1}.tripulacion.jugadores`);
                let bal = (bal2)
                if ((!bal || bal === NaN || null || undefined)) return;
                let nick = await crew.obtener(`854572979353813032.${idse}.tripulacion.nombre`)
            
                let ak = xd.includes(idse)
                if(ak === true){return}
                if(ak === false){
                    xd.push(idse)
    
                   
                    
                    xx.push({ data: bal, ID: `${nick}` });
                    
                    
                    
                    
                    ;}
                })
            })
            );///
            await Promise.all(
                client.guilds.cache.map(guild => { 
                client.guilds.cache.get(`${guild.id}`).members.cache.map(async(member) =>{
                    let id = member.id;
                    let ids = await perfil.obtener(`854572979353813032.${id}.crew.id`)
                
                let nick = await crew.obtener(`854572979353813032.${ids?ids:1}.tripulacion.nombre`)

                let bal2 = await crew.obtener(`854572979353813032.${ids?ids:1}.tripulacion.jugadores`);
                let bal = (bal2)
                    if ((!bal || bal === NaN || null)) return;
                
                   
                        xx.shift(id)
                       
                        
                        
                        
                    })
                })
                );
          
            let xy = xx.sort((a, b) => b.data - a.data);
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
    
                final += `${path}. **${xy[i].data.toLocaleString('en-US')}** Nakamas -- ${xy[i].ID}\n`
            } 
        const embed = new Discord.MessageEmbed()
        .setTitle('Ranking Global(Nakamas)')
        .setDescription(`${final}`) 
        .setColor("RANDOM")
        message.channel.send(embed)
        return
    }
    if(funcion == 'almacen'){
        let id = await perfil.obtener(`854572979353813032.${us.id}.crew.id`)

        let nombree = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
        let alm = await crew.obtener(`854572979353813032.${id}.tripulacion.recursos`)

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Almacen de ${nombree}`)
        .setDescription(`${alm.join('\n')}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        return
    }
  
    let ids = await perfil.obtener(`854572979353813032.${us.id}.crew.id`)
    var id = [`${ids}`]

   

     


    
    
    
    let nombree = await crew.obtener(`854572979353813032.${id}.tripulacion.nombre`)
    let barco = await crew.obtener(`854572979353813032.${id}.tripulacion.barco.nombre`)
    let dine = await crew.obtener(`854572979353813032.${id}.tripulacion.dinero`)
    let nivel = await crew.obtener(`854572979353813032.${id}.tripulacion.nivel`)
    let xp = await crew.obtener(`854572979353813032.${id}.tripulacion.xp`)
    let mxp = await crew.obtener(`854572979353813032.${id}.tripulacion.maxp`)
    let jugadores = await crew.obtener(`854572979353813032.${id}.tripulacion.jugadores`)
    let mj = await crew.obtener(`854572979353813032.${id}.tripulacion.maxju`)
    let img = await crew.obtener(`854572979353813032.${id}.tripulacion.ba`)
    let poder = await crew.obtener(`854572979353813032.${id}.tripulacion.estad.at`)
    let poder1 = await crew.obtener(`854572979353813032.${id}.tripulacion.estad.def`)
    let podert = (poder + poder1)
    var porcentaje = (xp/mxp) * 100;
    var intporcentaje = Math.round(porcentaje)
    let s = await crew.obtener(`854572979353813032.${id}.tripulacion.cantidad`)
    let sm = await crew.obtener(`854572979353813032.${id}.tripulacion.barco.capacidadmax`)
    let sumisi = (s/sm) * 100;
    var sumi = Math.round(sumisi)
    


    
    const embed = new Discord.MessageEmbed()
    .setTitle(`${nombree}`)
    .addFields(
        {
            name: `Progreso (${intporcentaje}%)`,
            value: `**Nivel**: ${nivel}\n**XP**: ${xp.toLocaleString('en-US')}/${mxp.toLocaleString('en-US')}\n**Jugadores**: ${jugadores}/${mj}`,
            inline: true
        },
        {
            name: "Estadisticas",
            value: `**Poder**: ${podert.toLocaleString('en-US')}\n**Barco**: ${barco}\n**Suministros**: ${sumi}%\n**Dinero**: <:berri:907114454108491806>${dine.toLocaleString('en-US')} Berries`,
            inline: true
        },
        {
            name: "Crew Comandos",
            value: "`eliminar`, `invitar`, `kick`,\n`salir`, `lista`, `alianza`, `ranking`,\n`bandera`, `almacen`\n\nEjemplo: `op!crew lista`"
        }
    )
    .setThumbnail(`${img}`)
    .setFooter(`ID: ${id}`)
    .setColor("RANDOM")

    message.channel.send(embed)
    
}
}
