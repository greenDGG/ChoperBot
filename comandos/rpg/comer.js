const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const limit = new db.crearDB('limite', 'rpg')

module.exports = {
  name: "comer", 
  alias: ["earn"], 
  
async execute (client, message, args){
   
    let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)//nombre del perfil
    let comida = args.join(' ')//lo que quiere comer

    var tiene = [args[1]?`omusubi ${args[1]}`:'omusubi', args[1]?`carne ${args[1]}`:'carne', args[1]?`sushi ${args[1]}`:'sushi', args[1]?`gomitas ${args[1]}`:'gomitas', args[1]?`paleta ${args[1]}`:'paleta']//esta son las comidas
    var fruta = ['ito ito','nikyu nikyu', 'doku doku', 'numa numa', 'magu magu', 'pika pika', 'hie hie', 'bane bane', 'bara bara', 'ope ope', 'sube sube', 'bomu bomu', 'kiro kiro', 'hana hana', 'moku moku', 'batto batto', 'kage kage', 'mera mera', "mochi mochi", "horo horo"]//estas son las frutas
    if(!comida){
        message.channel.send(`${name}, Que deceas comer?`)
        return
    }

    let fr = fruta.includes(`${comida}`)
    if(fr === true){
        let qf;
        let ns;
        let kl;
        let at;
        let def;
        let id;
        switch (comida){
            case 'yami yami'://listo
                id = 53
                qf = 'yami'
                def = 30
                at = 80
                
                kl = 'La Fruta **Yami Yami No Mi**'
                ns = '**Yami Yami No Mi:** '
                break;
            case 'gura gura'://listo
                id = 52
                qf = 'gura'
                def = 60
                at = 100
                
                kl = 'La Fruta **Gura Gura No Mi**'
                ns = '**Gura Gura No Mi:** '
                break;
            case 'gomu gomu':
                id = 51
                qf = 'gomu'
                def = 60
                at = 40
                
                kl = 'La Fruta **Gomu Gomu No Mi**'
                ns = '**Gomu Gomu No Mi:** '
                break;
            case 'noro noro':
                id = 50
                qf = 'noro'
                def = 30
                at = 20
                
                kl = 'La Fruta **Noro Noro No Mi**'
                ns = '**Noro Noro No Mi:** '
                break;
            case 'mini mini':
                id = 49
                qf = 'mini'
                def = 80
                at = 70
                
                kl = 'La Fruta **Mini Mini No Mi**'
                ns = '**Mini Mini No Mi:** '
                break;
            case 'gol gol':
                id = 48
                qf = 'gol'
                def = 80
                at = 75
                
                kl = 'La Fruta **Gol Gol No Mi**'
                ns = '**Gol Gol No Mi:** '
                break;
            case 'utsu utsu':
                id = 47
                qf = 'utsu'
                def = 100
                at = 100
                
                kl = 'La Fruta **Utsu Utsu No Mi**'
                ns = '**Utsu Utsu No Mi:** '
                break;
            case 'kumi kumi':
                id = 46
                qf = 'kumi'
                def = 50
                at = 50
                
                kl = 'La Fruta **Kumi Kumi No Mi**'
                ns = '**Kumi Kumi No Mi:** '
                break;
            case 'tokaan tokaan':
                id = 45
                qf = 'tokaan'
                def = 40
                at = 75
                
                kl = 'La Fruta **Tokaan Tokaan No Mi**'
                ns = '**Tokaan Tokaan No Mi:** '
                break;
            case 'uzu uzu':
                id = 44
                qf = 'uzu'
                def = 20
                at = 60
                
                kl = 'La Fruta **Uzu Uzu No Mi**'
                ns = '**Uzu Uzu No Mi:** '
                break;
            case 'sara sara':
                id = 43
                qf = 'sara'
                def = 30
                at = 40
                
                kl = 'La Fruta **Sara Sara No Mi**'
                ns = '**Sara Sara No Mi:** '
                break;
            case 'baku baku'://listo
                id = 42
                qf = 'baku'
                def = 40
                at = 30
                
                kl = 'La Fruta ** No Mi**'
                ns = '** No Mi:** '
                break;
            case 'yomi yomi':
                id = 41
                qf = 'yomi'
                def = 100
                at = 30
                
                kl = 'La Fruta **Yomi Yomi No Mi**'
                ns = '**Yomi Yomi No Mi:** '
                break;
            case 'gasha gasha':
                id = 40
                qf = 'gasha'
                def = 40
                at = 60
                
                kl = 'La Fruta **Gasha Gasha No Mi**'
                ns = '**Gasha Gasha No Mi:** '
                break;
            case 'doru doru':
                id = 38
                qf = 'doru'
                def = 70
                at = 40
                
                kl = 'La Fruta **Doru Doru No Mi**'
                ns = '**Doru Doru No Mi:** '
                break;
            case 'suna suna':
                id = 37
                qf = 'suna'
                def = 50
                at = 50
                
                kl = 'La Fruta **Suna Suna No Mi**'
                ns = '**Doru Doru No Mi:** '
                break;
            case 'ito ito':
                id = 36
                qf = 'ito'
                def = 75
                at = 85
                
                kl = 'La Fruta **<:itoito:885735925156577281> Ito Ito No Mi**'
                ns = '**<:itoito:885735925156577281> Ito Ito No Mi:** '
                break;      
            case 'nikyu nikyu':
                id = 28
                qf = 'nikyu'
                def = 40
                at = 80
                kl = 'La Fruta **<:nani:886480414112374824> Nikyu Nikyu No Mi**'
                ns = '**<:nani:886480414112374824> Nikyu Nikyu No Mi:** '
                break;
            case 'doku doku':
                id = 29
                qf = 'doku'
                def = 80
                at = 95
                kl = 'La Fruta **<:nani:886480414112374824> Doku Doku No Mi**'
                ns = '**<:nani:886480414112374824> Doku Doku No Mi:** '
                break;
            case 'numa numa':
                id = 30
                qf = 'numa'
                def = 30
                at = 30
                kl = 'La Fruta **<:nani:886480414112374824> Numa Numa No Mi**'
                ns = '**<:nani:886480414112374824> Numa Numa No Mi:** '
                break;
            case 'magu magu':
                id = 31
                qf = 'magu'
                def = 70
                at = 90
                kl = 'La Fruta **<:nani:886480414112374824> Magu Magu No Mi**'
                ns = '**<:nani:886480414112374824> Magu Magu No Mi:** '
                break;
            case 'pika pika':
                id = 32
                qf = 'pika'
                def = 60
                at = 90
                kl = 'La Fruta **<:nani:886480414112374824> Pika Pika No Mi**'
                ns = '**<:nani:886480414112374824> Pika Pika No Mi:** '
                break;
            case 'hie hie':
                id = 33
                qf = 'hie'
                def = 60
                at = 70
                kl = 'La Fruta **<:nani:886480414112374824> Hie Hie No Mi**'
                ns = '**<:nani:886480414112374824> Hie Hie No Mi:** '
                break;
            case 'bane bane':
                id = 34
                qf = 'bane'
                def = 20
                at = 40
                kl = 'La Fruta **<:nani:886480414112374824> Bane Bane No Mi**'
                ns = '**<:nani:886480414112374824> Bane Bane No Mi:** '
                break;
            case 'horo horo':
                id = 27
                qf = 'horo'
                def = 80
                at = 80
                kl = 'La Fruta **<:nani:886480414112374824> Horo Horo No Mi**'
                ns = '**<:nani:886480414112374824> Horo Horo No Mi:** '
                break;
            case 'mochi mochi':
                id = 26
                qf = 'mochi'
                def = 50
                at = 80
                ns = '**<:nani:886480414112374824> Mochi Mochi No Mi:** '
                kl = 'La Fruta **<:nani:886480414112374824> Mochi Mochi No Mi**'
                break;
            case 'mera mera'://listo
                id = 2
                qf = 'mera'
                def = 70
                at = 80
                ns = '**<:meramera:882404943716290561> Mera Mera No Mi:** '
                kl = 'La Fruta **<:meramera:882404943716290561> Mera Mera No Mi** '
                break;
            case 'kage kage':
                id = 20
                qf = 'kage'
                def = 40
                at = 50
                ns = '**<:kagekage:885743175493369926> Kage Kage No Mi:** '
                kl = 'La Fruta **<:kagekage:885743175493369926> Kage Kage No Mi** '
                break;
            case 'sube sube':
                id = 13
                qf = 'sube'
                def = 50
                at = 10
                ns = '**<:subesube:885737806138314833> Sube Sube No Mi:** '
                kl = 'La Fruta **<:subesube:885737806138314833> Sube Sube No Mi** '
                break;
            case 'bomu bomu'://listo
                id = 15
                qf = 'bomu'
                def = 20
                at = 50
                ns = '**<:bomubomu:885739844276486165> Bomu Bomu No Mi:** '
                kl = 'La Fruta **<:bomubomu:885739844276486165> Bomu Bomu No Mi** '
                break;
            case 'kiro kiro':
                id = 17
                qf = 'kiro'
                def = 20
                at = 40
                ns = '**<:kirokiro:885741345635971113> Kiro Kiro No Mi:** '
                kl = 'La Fruta **<:kirokiro:885741345635971113> Kiro Kiro No Mi** '
                break;
            case 'hana hana':
                id = 35
                qf = 'hana'
                def = 40
                at = 60
                ns = '**<:hanahana:890638063129223198> Hana Hana No Mi:** '
                kl = 'La Fruta **<:hanahana:890638063129223198> Hana Hana No Mi** '     
                break;
            case 'moku moku':
                id = 12
                qf = 'moku'
                def = 60
                at = 40
                ns = '**<:mokumoku:885736818681729054> Moku Moku No Mi:** '
                kl = 'La Fruta **<:mokumoku:885736818681729054> Moku Moku No Mi** '
                break;
            case 'batto batto':
                id = 22
                qf = 'batto'
                def = 30
                at = 50
                kl = 'La Fruta Batto Batto No Mi '
                ns = 'Batto Batto No Mi: '
                break;
            case 'ope ope'://listo
                id = 4
                qf = 'ope'
                def = 50
                at = 80
                kl = 'La Fruta **<:opeope:885731605673549834> Ope Ope No Mi** '
                ns = '**<:opeope:885731605673549834> Ope Ope No Mi:** '
                break;
            case 'bara bara'://listo
                id = 6
                qf = 'bara'
                def = 50
                at = 20
                kl = 'La Fruta **<:barabara:882284030136025119> Bara Bara No Mi** '
                ns = '**<:barabara:882284030136025119> Bara Bara No Mi:** '
                break;
        }
        
        let tf = await inventario.obtener(`854572979353813032.${message.author.id}.frutas.${qf}`)
        let tiene = await perfil.obtener(`854572979353813032.${message.author.id}.equipo.fruta`)
        
        if(tf === 0){
            message.channel.send("No Tienes Esta Fruta En Tu Inventario...")
            return
        }
        if(tiene > 0){
            message.channel.send('Ya Te Has Comido Una Fruta, **No Puedes Comer 2**')
            return
        }
        message.channel.send(`${name}, Se Ha Comido ${kl}`).then((msg) =>{
            setTimeout(() =>{

                msg.edit(`${name}, Se Esta Sintiendo Raro...`).then((m) =>{
                    setTimeout(() =>{
                        m.edit(`${name}, Empieza A Notar Cambios.`)

                    }, 2000)
                })
            }, 5000)

        })
        inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `${ns}${tf}`)
        inventario.establecer(`854572979353813032.${message.author.id}.frutas.${qf}`, 0)
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.ataque`, at)
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.defenza`, def)
        perfil.establecer(`854572979353813032.${message.author.id}.equipo.fruta`, id)
        limit.establecer(`854572979353813032.limite.l${qf}`, 1)

        if(message.guild.id != '854572979353813032'){return}
        message.member.roles.add("892256062449803304")
        message.member.roles.add("892262101316411403")




        return

}//esto es lo de la fruta del diablo

    let s = tiene.includes(`${comida}`)//verifica si se ha puesto bien el nombre de la comida


    let cyv;//texto
    let as;//inventario
    let sdd;//recuperacion
    let env;//vida o energia
    let cmd;
    switch (comida){
        case args[1]?`sushi ${args[1]}`:'sushi':
            as = '**🍣 Sushi:** '
            sdd = args[1]?25*args[1]:25
            cyv = `Sushi Y Recupero ❤️${sdd} De Vida`
            env = 'vida'
            cmd = 'sushi'

            break;
        case args[1]?`gomitas ${args[1]}`:'gomitas':
            as = '**Gomitas:** '
            sdd = args[1]?2*args[1]:2

            cyv = `Gomitas Y Recupero ⚡${sdd} De Energia`
            env = 'energia'
            cmd = 'gomitas'

            break;
        case args[1]?`paleta ${args[1]}`:'paleta':
            as = '**🍭 Paletas:** '
            sdd = args[1]?5*args[1]:5
            cyv = `Una Paleta Y Recupero ⚡${sdd} De Energia`
            env = 'energia'
            cmd = 'paleta'

            break;
        case args[1]?`omusubi ${args[1]}`:'omusubi':
            as = '**<:omushibi:882246321522741338> Omusubi:** '
            sdd = args[1]?10*args[1]:10

            cyv = `Omusubi Y Recupero ❤️${sdd} De Vida`
            env = 'vida'
            cmd = 'omusubi'

            break;
        case args[1]?`carne ${args[1]}`:'carne':
            as = '**<:carne:882244710649962526> Carne:** '
            sdd = args[1]?20*args[1]:20
            cyv = `Carne Y Recupero ❤️${sdd} De Vida`
            env = 'vida'
            cmd = 'carne'

            break;
    }//contiene que da de cada comida
    let cs = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${cmd}`)//cuanta comida tiene
    
    
    if(s === true){
        if(args[1] ? (cs < args[1]):(cs === 0)){
            message.channel.send("No Tienes Esta Comida En Tu Inventario...")
            return
        }//tiene comida?
        let vd = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.${env}`)//obtiene la vida o la energia
        let vdm = await perfil.obtener(`854572979353813032.${message.author.id}.estadisticas.max${env}`)//obtiene la maxima de vida o de energia
        if(vd === vdm){return message.channel.send(`${name}, Ya tienes la ${env} al Maximo`)}

        message.channel.send(`${name}, Ha Comido ${cyv}`)
        inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `${as}${cs}`)//extrae la comida del inventario
        inventario.restar(`854572979353813032.${message.author.id}.comida.${cmd}`, args[1]?args[1]:1)//resta la comida que comio del inv.
        let cll = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${cmd}`)//obtiene nuevos datos de la comida
        
        if(cll != 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${as}${cll}`)}//pushea la comida con un nuevo numero
       
        let vn = (sdd + vd)
        


        if(vn >= (vdm)){

            
            perfil.establecer(`854572979353813032.${message.author.id}.estadisticas.${env}`, vdm)
            let ka = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${cmd}`)
            let om = await inventario.obtener(`854572979353813032.${message.author.id}.comida.omusubi`)
            let ca = await inventario.obtener(`854572979353813032.${message.author.id}.comida.carne`)
            let go = await inventario.obtener(`854572979353813032.${message.author.id}.comida.gomitas`)
            let su = await inventario.obtener(`854572979353813032.${message.author.id}.comida.sushi`)
            let pa = await inventario.obtener(`854572979353813032.${message.author.id}.comida.paleta`)
            if(ka === 0){
                if(om > 0){return}
                if(ca > 0){return}
                if(go > 0){return}
                if(su > 0){return}
                if(pa > 0){return}
                inventario.push(`854572979353813032.${message.author.id}.inventarioc`, 'Sin Comidas')
            }
            return
        }//si la vida se pasa
        
        perfil.sumar(`854572979353813032.${message.author.id}.estadisticas.${env}`, sdd)
        let ka = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${cmd}`)
        let om = await inventario.obtener(`854572979353813032.${message.author.id}.comida.omusubi`)
        let ca = await inventario.obtener(`854572979353813032.${message.author.id}.comida.carne`)
        let go = await inventario.obtener(`854572979353813032.${message.author.id}.comida.gomitas`)
        let su = await inventario.obtener(`854572979353813032.${message.author.id}.comida.sushi`)
        let pa = await inventario.obtener(`854572979353813032.${message.author.id}.comida.paleta`)
        if(ka === 0){
            if(om > 0){return}
            if(ca > 0){return}
            if(go > 0){return}
            if(su > 0){return}
            if(pa > 0){return}
            inventario.push(`854572979353813032.${message.author.id}.inventarioc`, 'Sin Comidas')
        }//por si se queda sin comida
        return
    }
    
        message.channel.send(`No encuentro ${comida} en tu inventario`)
        return
    

    
   
    
    

   


}
}