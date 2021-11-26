const Discord = require('discord.js');
const db = require("megadb")
const crew = new db.crearDB("crews", 'rpg')
const misiones = new db.crearDB('misiones', 'rpg')
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cd = new db.crearDB('cooldown', 'rpg')
const limit = new db.crearDB('limite', 'rpg')


module.exports = {
  name: "comprar", 
  alias: ["buy"], 
  
async execute (client, message, args){
  
    
    
    let comdida = args[0]
    let comida = args.join(' ')
    let dinero = await perfil.obtener(`854572979353813032.${message.author.id}.money.dinero`)
    let nme = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)

    

   

////////////comidas
if(!comdida){
    message.reply("El uso correcto de este comando es `op!buy [item]`\nVea lo que puede comprar con `op!shop`")
    return
}
let cmd = ['sushi', 'gomitas', 'carne', 'paleta', 'omusubi', 'manzana', 'mandarina', 'galleta']
let cmdf = ['mini mini no mi','mini mini','magu magu no mi','bara bara no mi','sube sube no mi','bomu bomu no mi','kiro kiro no mi','hana hana no mi','moku moku no mi','batto batto no mi','ope ope no mi','kage kage no mi','mera mera']
//fruta
if(cmdf.includes(comida) === true){
    let fr;
    let valor;
    let msg;
    let push;
    switch(comida){
        case 'mini mini no mi':
            push = `**<:nani:886480414112374824> Mini Mini No Mi:** 1`
            msg = 'Has Comprado La <:nani:886480414112374824> `Fruta Mini Mini No Mi` con éxito por 250,000,000 Berris'
            valor = 250000000//250k
            fr = 'mini'
            break
        case 'mini mini':
            push = `**<:nani:886480414112374824> Mini Mini No Mi:** 1`
            msg = 'Has Comprado La <:nani:886480414112374824> `Fruta Mini Mini No Mi` con éxito por 250,000,000 Berris'
            valor = 250000000//250k
            fr = 'mini'
            break
        case 'magu magu no mi' || 'magu magu':
            push = `**<:nani:886480414112374824> Magu Magu No Mi:** 1`
            msg = 'Has Comprado La <:nani:886480414112374824> `Fruta Magu Magu No Mi` con éxito por 1.000.000.000 Berris'
            valor = 1000000000//1B
            fr = 'magu'
            break;
        case 'mera mera':
            push = `**<:meramera:882404943716290561> Mera Mera No Mi:** 1`
            msg = 'Has Comprado La <:meramera:882404943716290561> `Fruta Mera Mera No Mi` con éxito por 850.000.000 Berris'
            valor = 850000000//850M
            fr = 'mera'
            break;
        case 'kage kage no mi' || 'kage kage':
            push = `**<:kagekage:885743175493369926> Kage Kage No Mi:** 1`
            msg = 'Has Comprado La <:kagekage:885743175493369926> `Fruta Kage Kage No Mi` con éxito por 600.000.000 Berris'
            valor = 600000000//600M
            fr = 'kage'
            break;
        case 'ope ope no mi' || 'ope ope':
            push = `**<:opeope:885731605673549834> Ope Ope No Mi:** 1`
            msg = 'Has Comprado La <:opeope:885731605673549834> `Fruta Ope Ope No Mi` con éxito por 520.000.000 Berris'
            valor = 520000000//520M
            fr = 'ope'
            break;
        case 'batto batto no mi' || 'batto batto':
            push = `**Batto Batto No Mi:** 1`
            msg = 'Has Comprado La `Fruta Batto Batto No Mi` con éxito por 500.000.000 Berris'
            valor = 500000000//500M
            fr = 'batto'
            break;
        case 'moku moku no mi' || 'moku moku':
            push = `**<:mokumoku:885736818681729054> Moku Moku No Mi:** 1`
            msg = 'Has Comprado La <:mokumoku:885736818681729054> `Fruta Moku Moku No Mi` con éxito por 500.000.000 Berris'
            valor = 500000000//500M
            fr = 'moku'
            break;
        case 'hana hana no mi' || 'hana hana':
            push = `**<:hanahana:890638063129223198> Hana Hana No Mi:** 1`
            msg = 'Has Comprado La <:hanahana:890638063129223198> `Fruta Hana Hana No Mi` con éxito por 450.000.000 Berris'
            valor = 450000000//450M
            fr = 'hana'
            break;
        case 'kiro kiro no mi' || 'kiro kiro':
            push = `**<:kirokiro:885741345635971113> Kiro Kiro No Mi:** 1`
            msg = 'Has Comprado La <:kirokiro:885741345635971113> `Fruta Kiro Kiro No Mi` con éxito por 300.000.000 Berris'
            valor = 300000000
            fr = 'kiro'
            break;
        case 'bomu bomu no mi' || 'bomu bomu':
            push = `**<:bomubomu:885739844276486165> Bomu Bomu No Mi:** 1`
            msg = 'Has Comprado La <:bomubomu:885739844276486165> `Fruta Bomu Bomu No Mi` con éxito por 300.000.000 Berris'
            valor = 300000000
            fr = 'bomu'
            break;
        case 'sube sube no mi' || 'sube sube':
        push = `**<:subesube:885737806138314833> Sube Sube No Mi:** 1`
        msg = 'Has Comprado La <:subesube:885737806138314833> `Fruta Sube Sube No Mi` con éxito por 150.000.000 Berris'
        valor = 150000000
        fr = 'sube'
        break;
        case 'bara bara no mi' || 'bara bara':
        push = `**<:barabara:882284030136025119> Bara Bara No Mi:** 1`
        msg = 'Has Comprado La <:barabara:882284030136025119> `Fruta Bara Bara No Mi` con éxito por 150,000,000 Berris'
        valor = 150000000
        fr = 'bara'
        break;
    }

    let limita = await limit.obtener(`854572979353813032.limite.l${fr}`)
     if(limita === 1){return message.channel.send("Lo Sentimos Pero Este Articulo Se Agoto...")}
     if(dinero < valor){return message.channel.send("No tienes suficiente dinero para comprar esto.")}
     let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioc`)
    if(`${a}` === 'Sin Comidas'){inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, 'Sin Comidas')}

    message.channel.send(msg)
    perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, valor)
    inventario.sumar(`854572979353813032.${message.author.id}.frutas.${fr}`, 1)

    inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${push}`)
    limit.establecer(`854572979353813032.limite.l${fr}`, 1)

    
    return
}
if(cmd.includes(comdida) === true){


let precio;
let precio1;
let nombrec;
let invs;
let msg;
let inv;
switch(comdida){
    //comida
    case 'sushi':
        precio = 500 * args[1]
        precio1 = 500
        nombrec = 'sushi'
        invs = '**🍣 Sushi:** 0'
        inv = '**🍣 Sushi:** '
        msg = args[1] ? `${args[1]}` + ' 🍣 `Sushis` comprado con éxito por ' + precio + ' Berris':'1' + ' 🍣 `Sushi` comprado con éxito por 20000 Berris'
        break;
    case 'gomitas':
        precio = 200 * args[1]
        precio1 = 200
        nombrec = 'gomitas'
        invs = '**Gomitas:** 0'
        inv = '**Gomitas:** '
        msg = args[1] ? `${args[1]}` + ' `Gomitas` comprado con éxito por ' + precio + ' Berris':'1' + ' `Gomita` comprado con éxito por 200 Berris'
       
        break;
    case 'carne':
        precio = 1000 * args[1]
        precio1 = 1000
        nombrec = 'carne'
        invs = '**<:carne:882244710649962526> Carne:** 0'
        inv = '**<:carne:882244710649962526> Carne:** '
        msg = args[1] ? `${args[1]}` + ' <:carne:882244710649962526>`Carne` comprado con éxito por ' + precio + ' Berris':'1' + ' `Carne` comprado con éxito por 1000 Berris'
        break;
    case 'paleta':
        precio = 800 * args[1]
        precio1 = 800
        nombrec = 'paleta'
        invs = '**🍭 Paletas:** 0'
        inv = '**🍭 Paletas:** '
        msg = args[1] ? `${args[1]}` + ' 🍭`Paletas` comprada con éxito por ' + precio + ' Berris':'1' + ' 🍭`Paleta` comprada con éxito por 800 Berris'
       
        break;
    case 'omusubi':
        precio = 500 * args[1]
        precio1 = 500
        nombrec = 'omusubi'
        invs = '**<:omushibi:882246321522741338> Omusubi:** 0'
        inv = '**<:omushibi:882246321522741338> Omusubi:** '
        msg = args[1] ? `${args[1]}` + ' <:omushibi:882246321522741338>`Omusubi` comprado con éxito por ' + precio + ' Berris':'1' + ' <:omushibi:882246321522741338>`Omusubi` comprado con éxito por 500 Berris'
        break;
}
if(args[1] ? (dinero < precio):(dinero < precio1)){
    message.channel.send("No tienes suficiente dinero para comprar esto.")
    return
}
let cd = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${nombrec}`)
if(cd === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${invs}`)}
let a = await inventario.obtener(`854572979353813032.${message.author.id}.inventarioc`)
if(`${a}` === 'Sin Comidas'){
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, 'Sin Comidas')
}

message.channel.send(msg)


perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, args[1] ? precio:precio1)
inventario.sumar(`854572979353813032.${message.author.id}.comida.${nombrec}`, args[1] ? args[1]:1)
inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `${inv}${cd}`)
let c = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${nombrec}`)
inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${inv}${c}`)
return
}


//cañas
let cañas = ['caña 1', 'caña 2', 'caña 3', 'caña 4', 'caña 5','caña i', 'caña ii', 'caña iii', 'caña iv', 'caña v', 'caña I', 'caña II', 'caña III', 'caña IV', 'caña V']
if(cañas.includes(comida) === true){
    let valor;
    let nombre;
    let base;
    let n;
    switch(comida){
        case 'caña v':
            nombre = '<:pesca5:907963080800079912> Caña V'
            base = 'caña5'
            valor = 500000
            n = 5  
            break
        case 'caña V':
            nombre = '<:pesca5:907963080800079912> Caña V'
            base = 'caña5'
            valor = 500000
            n = 5  
            break
        case 'caña 5':
            nombre = '<:pesca5:907963080800079912> Caña V'
            base = 'caña5'
            valor = 500000
            n = 5  
            break
            //caña 4
        case 'caña IV':
            nombre = '<:pesca4:907962986549891104> Caña IV'
            base = 'caña4'
            valor = 200000
            n = 4
            break
        case 'caña iv':
            nombre = '<:pesca4:907962986549891104> Caña IV'
            base = 'caña4'
            valor = 200000
            n = 4
            break
        case 'caña 4':
            nombre = '<:pesca4:907962986549891104> Caña IV'
            base = 'caña4'
            valor = 200000
            n = 4
            break
            //caña 3
        case 'caña III':
            nombre = '<:pesca3:907962785546264597> Caña III'
            base = 'caña3'
            valor = 100000
            n = 3
            break
        case 'caña iii':
            nombre = '<:pesca3:907962785546264597> Caña III'
            base = 'caña3'
            valor = 100000
            n = 3
            break
        case 'caña 3':
            nombre = '<:pesca3:907962785546264597> Caña III'
            base = 'caña3'
            valor = 100000
            n = 3
            break
            //caña 2
        case 'caña II':
            nombre = '<:pesca2:907962431765114881> Caña II'
            base = 'caña2'
            valor = 60000
            n = 2
            break
        case 'caña ii':
            nombre = '<:pesca2:907962431765114881> Caña II'
            base = 'caña2'
            valor = 60000
            n = 2
            break
        case 'caña 2':
            nombre = '<:pesca2:907962431765114881> Caña II'
            base = 'caña2'
            valor = 60000
            n = 2
            break
            //caña 1
        case 'caña I':
            nombre = '<:pesca1:907959291632312370> Caña I'
            base = 'caña1'
            valor = 20000
            n = 1  
            break
        case 'caña i':
            nombre = '<:pesca1:907959291632312370> Caña I'
            base = 'caña1'
            valor = 20000
            n = 1  
            break
        case 'caña 1':
            nombre = '<:pesca1:907959291632312370> Caña I'
            base = 'caña1'
            valor = 20000
            n = 1  
            break
    }
    if(dinero < valor){return message.channel.send('No tienes suficiente dinero para comprar esta caña')}
    let tinec = await inventario.obtener(`854572979353813032.${message.author.id}.cosas.caña`)
    if(`caña${tinec}` === base){return message.channel.send('Ya posees esta caña de pescar')}
    if(tinec > 0){
        let c;
        let em;
        switch(tinec){
            case 5:
                c = 'V'
                em = '<:pesca5:907963080800079912>'
                break
            case 4:
                c = 'IV'
                em = '<:pesca4:907962986549891104>'
                break
            case 3:
                c = 'III'
                em = '<:pesca3:907962785546264597>'
                break
            case 2:
                c = 'II'
                em = '<:pesca2:907962431765114881>'
                break
            case 1:
                c = 'I'
                em = '<:pesca1:907959291632312370>'
                break
        }
        message.channel.send(`Tienes una **Caña ${c}** quieres cambiarla por la **${nombre}**\n`+'`si/no`')
        const cjuego = message.channel.createMessageCollector(m => m.author.id === message.author.id)
      cjuego.on('collect', async(msg) =>{
          if(msg.content == 'si'){
               message.channel.send(`Has Comprado La **${nombre}** por **${valor.toLocaleString('en-US')}** Berries`)
               perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, valor)
               inventario.establecer(`854572979353813032.${message.author.id}.cosas.caña${tinec}`, 0)
               inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `**${em} Caña ${c}:** 1`)
               inventario.establecer(`854572979353813032.${message.author.id}.cosas.${base}`, 1)
               inventario.establecer(`854572979353813032.${message.author.id}.cosas.caña`, n)
               inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**${nombre}:** 1`)
               cjuego.stop()
               return
          }
          if(msg.content == 'no'){
            message.channel.send(`ok`)
            cjuego.stop()
            return
       }
      })
        return
    }
    
   message.channel.send(`Has Comprado La **${nombre}** por **${valor.toLocaleString('en-US')}** Berries`)
   perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, valor)
   inventario.establecer(`854572979353813032.${message.author.id}.cosas.${base}`, 1)
   inventario.establecer(`854572979353813032.${message.author.id}.cosas.caña`, n)
   inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `**${nombre}:** 1`)

   
    return
}
///barcos
let barcos = ["balsa", "fusta", "goleta", "coca", "carabela", "bergantin", "carraca", "nao", "galera", "balandra", "galeon", "corbeta", "navio"]
if(barcos.includes(comida)=== true){
    let valor;
    let nombre;
    let id;
    let base;
    switch(comida){

        case "balsa":
        valor = 250000
        nombre = 'Una Balsa'
        id = 1 
        base = 'Balsa'
        mj = 4
        capa = 100
        break
        case "fusta":
        valor = 1000000
        nombre = 'Un Fusta'
        id = 2
        base = 'Fusta'
        mj = 18
        capa = 15000
        break
        case"goleta": 
        valor = 1500000
        nombre = 'Una Goleta'
        id = 3
        base = 'Goleta'
        mj = 20
        capa = 200000
        break
        case "coca":
        valor = 2000000
        nombre = 'Una Coca'
        id = 4
        base = 'Coca'
        mj = 25
        capa = 250000
        break
        case"carabela":
        valor = 2500000
        nombre = 'Una Carabela'
        id = 5
        base = 'Carabela'
        mj = 30
        capa = 300000
        break
        case"bergantin":
        valor = 3000000
        nombre= 'Un Bergantin'
        id = 6
        base = 'Bergantin'
        mj = 30
        capa = 300000
        break
        case"carraca":
        valor = 5000000
        nombre = 'Un Carraca'
        id = 7
        base = 'Carraca'
        mj = 50
        capa = 600000
        break 
        case "nao": 
        valor = 6000000
        nombre = 'Un Nao'
        id = 8
        base = 'Nao'
        mj = 50
        capa = 600000
        break 
        case"galera": 
        valor = 7000000
        nombre = 'Un Galera'
        id = 9
        base = 'Galera'
        mj = 60
        capa = 800000
        break  
        case "balandra":
        valor = 8500000
        nombre = 'Un Balandra'
        id = 10
        base = 'Balandra'
        mj = 72
        capa = 1000000
        break 
        case "galeon": 
        valor = 10000000
        nombre = 'Un Galeón'
        id = 11
        base = 'Galeón'
        mj = 90
        capa = 2000000
        break 
        case "corbeta":
        valor = 12000000
        nombre = 'Un Corbeta'
        id = 12
        base = 'Corbeta'
        mj = 100
        capa = 6000000
        break 
        case "navio":
        valor = 15000000
        nombre = 'Un Navio'
        id = 13
        base = 'Navio'
        mj = 120
        capa = 10000000
        break 

    }
 if(dinero < valor){return message.channel.send('No tienes suficiente dinero para comprar esto...')}


 message.channel.send(`Has Comprado La **${nombre}** por **${valor.toLocaleString('en-US')}** Berries`)

 perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, valor)
 perfil.establecer(`854572979353813032.${message.author.id}.equipo.barco`, id)
 
 let cr = await perfil.obtener(`854572979353813032.${message.author.id}.crew.tripu`)
 if(cr === 0){return}
 let idn = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
 let wo = await crew.obtener(`854572979353813032.${idn}.tripulacion.owner`)

 if(`${wo}` === `${message.author.id}`){
     crew.establecer(`854572979353813032.${idn}.tripulacion.maxju`, mj)
     crew.establecer(`854572979353813032.${idn}.tripulacion.barco` , {id: `${message.author.id}`, nombre: `${base}`, cantidad: 0, capacidadmax: capa})
     
     console.log('anda')
 }



    return
}


//cofres
let cofres = [args[2]?`cofre vacio ${args[2]}`:"cofre vacio", args[2]?`cofre comun ${args[2]}`:"cofre comun", args[2]?`cofre raro ${args[2]}`:"cofre raro", args[2]?`cofre hyper ${args[2]}`:"cofre hyper", args[2]?`cofre epico ${args[2]}`:"cofre epico", args[2]?`cofre legendario ${args[2]}`:"cofre legendario"]
if(cofres.includes(comida) === true){
    let cuantos = args[2]
    let base;
    let base2;
    let valor;
    let text;
    switch(comida){
        case args[2]?`cofre vacio ${args[2]}`:"cofre vacio":
            base = "vacio"
            base2 = "**Cofre Vacio**: "
            valor = args[2]?1000*cuantos:1000
            text = cuantos?"Cofres Vacios":"Cofre Vacio"
            break
        case args[2]?`cofre comun ${args[2]}`:"cofre comun":
            base = "comun"
            base2 = "**<:cofrecomun:890255012138205255> Cofre Común**: "
            valor = args[2]?5000*cuantos:5000
            text = cuantos?"<:cofrecomun:890255012138205255>Cofres Comúnes":"<:cofrecomun:890255012138205255>Cofre Común"
            break
        case args[2]?`cofre raro ${args[2]}`:"cofre raro":
            base = "raro"
            base2 = "**<:cofreraro:890255268611518495> Cofre Raro**: "
            valor = args[2]?25000*cuantos:25000
            text = cuantos?"<:cofreraro:890255268611518495>Cofres Raros":"<:cofreraro:890255268611518495>Cofre Raro"
            break
        case args[2]?`cofre hyper ${args[2]}`:"cofre hyper":
            base = "hyper"
            base2 = "**<:cofrehyper:890255128827928616> Cofre Hyper**: "
            valor = args[2]?500000*cuantos:500000
            text = cuantos?"<:cofrehyper:890255128827928616>Cofres Hypers":"<:cofrehyper:890255128827928616>Cofre Hyper"
            break
        case args[2]?`cofre epico ${args[2]}`:"cofre epico":
            base = "epico"
            base2 = "**<:cofreepico:890255074419413032> Cofre Epico**: "
            valor = args[2]?100000*cuantos:100000
            text = cuantos?"<:cofreepico:890255074419413032>Cofres Epicos":"<:cofreepico:890255074419413032>Cofre Epico"
            break
        case args[2]?`cofre legendario ${args[2]}`:"cofre legendario":
            base = "legendary"
            base2 = "**<:cofrelegendario:890255198520492072> Cofre Legendario**: "
            valor = args[2]?1000000*cuantos:1000000
            text = cuantos?"<:cofrelegendario:890255198520492072>Cofres Legendarios":"<:cofrelegendario:890255198520492072>Cofre Legendario"
            break
    }
    if((valor > dinero)){return message.channel.send("No tienes suficiente dinero para comprar este cofre...")}
    message.channel.send(`**${nme}**, Has comprado ${cuantos?`${cuantos}`:"1"} ${text} por <:berri:907114454108491806>${valor.toLocaleString("en-US")} Berries`)

    let co = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.${base}`)
    if(co === 0){inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `${base2}0`)}
    if(co.includes("Sin Items" === true)){inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `Sin Items`)}
    inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `${base2}${co}`)
    inventario.sumar(`854572979353813032.${message.author.id}.cofres.${base}`, cuantos?cuantos:1)
    perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, valor)
    let cco = await inventario.obtener(`854572979353813032.${message.author.id}.cofres.${base}`)
    inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `${base2}${cco}`)


    
    return
}

message.channel.send('Lo Sentimos, Pero No He Encontrado Ese Objeto En La Tienda.')





//frutas

///armas


  

 }

} 