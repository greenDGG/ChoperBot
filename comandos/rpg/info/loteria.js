const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const cool = new db.crearDB('cooldown', 'rpg')
const lote = new db.crearDB('loteria', "loteria")
const lotecd = new db.crearDB('cdlote', "loteria")

const lotepart = new db.crearDB('participantes', "loteria")
const { convertMS } = require("discordutility");



 

module.exports = {
  name: "loteria", 
  alias: ["lottery"], 
  
async execute (client, message, args){

    let precio = await lote.obtener('lote.precio')
    let pozo = await lote.obtener('lote.pozo')
    let ultimo = await lote.obtener('lote.ultimo')

    let cdl = await lotecd.obtener('lote.cd')
    const converted = convertMS(cdl); 
    let ss = `${converted.h}h ${converted.m}m ${converted.s}s`
    let buy = args[0]
    let cantidad = args[1]
    let name = await perfil.obtener(`854572979353813032.${message.author.id}.perfil.nombre`)
    if(buy === 'buy'){
        let din = await perfil.obtener(`854572979353813032.${message.author.id}.money.dinero`)
        let dinc = cantidad * precio
        if(cantidad?(din < dinc):(din < precio)){return message.channel.send('no tienes sufuciente dinero')}
        if(cantidad?(cantidad >= 101):""){return message.channel.send("Ehh cuantos boletos quieres comprar?")}

        message.channel.send(`**${name}**, Has comprado ${cantidad?cantidad+' boletos':'1 boleto'} de loteria por <:berri:907114454108491806>${cantidad?dinc.toLocaleString('en-US'):precio.toLocaleString('en-US')} Berries`)

        
        
           let ca = Math.abs(cantidad?cantidad:1) 
            var i = 1;
            while (i <= ca) {
                lotepart.push('participantes', message.author.id)
                
                

                 i++;
            }
        
        
        lote.sumar('lote.pozo', cantidad?dinc * 2:precio * 2)
        
        perfil.restar(`854572979353813032.${message.author.id}.money.dinero`, cantidad?dinc:precio)

        let cc = await inventario.obtener(`854572979353813032.${message.author.id}.cosas.ticket`)
        if(cc === 0){inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `Sin Items`)}
        if(cc != 0) {inventario.extract(`854572979353813032.${message.author.id}.inventarioi`, `🎫 **Boletos de loteria:** ${cc}`)}
        inventario.sumar(`854572979353813032.${message.author.id}.cosas.ticket`, cantidad?cantidad:1)

        let c = await inventario.obtener(`854572979353813032.${message.author.id}.cosas.ticket`)
        inventario.push(`854572979353813032.${message.author.id}.inventarioi`, `🎫 **Boletos de loteria:** ${c}`)
        return
    }
    if(buy === 'proximo'){
        let id = await lotepart.obtener('participantes')
        let idr = id[Math.floor(Math.random() * id.length)]
        let namep = await perfil.obtener(`854572979353813032.${idr}.perfil.nombre`)
        message.channel.send(`el proximo ganador puede ser **${namep}**`)
        return
    }

    const embed = new Discord.MessageEmbed()
    .setDescription('Puedes comprar un boleto con `op!loteria buy [cantidad]`')

    .addFields(
        {
            name: 'Loteria',
            value: `🎫 **Precio:** ${precio.toLocaleString('en-US')} Berries\n<:berri:907114454108491806> **Pozo:** ${pozo.toLocaleString('en-US')} Berries\n🕘 **Siguiente sorteo:** ${ss}`
        },
        {
            name: '🎉 Último ganador 🎉',
            value: `${ultimo}`
        }
    )
    .setColor('RANDOM')
    message.channel.send(embed)

  

 }

} 