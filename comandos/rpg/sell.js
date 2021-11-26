const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const crew = new db.crearDB("crews", 'rpg')

module.exports = {
  name: "sell", 
  alias: ["vender"], 
  
async execute (client, message, args){
    let sell = args.join(' ')
    let numer = args[2]

    let ve = [numer?`pez asfur ${numer}`:"pez asfur", args[2]?`pez dorado ${numer}`:'pez dorado', args[2]?`pez azul ${numer}`:'pez azul']
    if(!sell){return message.channel.send('¿Que Deseas Vender?')}

    if(ve.includes(sell) === false){return message.channel.send(`Lo siento pero no compramos **${sell}**.`)}

    //peces
    if(ve.includes(sell) === true){
    let valor;
    let nombre;
    let pez;
    let base;
    switch(sell){
        case numer?`pez asfur ${numer}`:'pez asfur':
            valor = numer?5000*numer:5000
            nombre = numer?'Peces Asfures':'Pez Asfur'
            pez = 'pez3'
            base =  "**<:emoji_1:907978099436711936> Pez Asfur:** "
            
            break
        case numer?`pez azul ${numer}`:'pez azul':
            valor = numer?500*numer:500
            nombre = numer?'Peces Azules':'Pez Azul'
            pez = 'pez1'
            base =  "**🐟 Pez Azul:** "
            
            break
        case numer?`pez dorado ${numer}`:'pez dorado':
            valor = numer?2000*numer:2000
            nombre = numer?'Peces Dorados':'Pez Dorado'
            pez = 'pez2'
            base = "**🐠 Pez Dorado:** "
            break
    }
    let tiene = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${pez}`)
    if(numer > tiene){return message.channel.send('No puedes vender mas de lo que tienes')}

    message.channel.send(`Has Vendido ${numer?`${numer} ${nombre}`:`1 ${nombre}`} por ${numer?`${valor.toLocaleString('en-US')}`:`${valor.toLocaleString('en-US')}`} Berries`)
    perfil.sumar(`854572979353813032.${message.author.id}.money.dinero`, valor)
    inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `${base}${tiene}`)
    inventario.restar(`854572979353813032.${message.author.id}.comida.${pez}`, numer?numer:1)
    let tienen = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${pez}`)
    if(tienen != 0){inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${base}${tienen}`)}
}

  

 }

}
