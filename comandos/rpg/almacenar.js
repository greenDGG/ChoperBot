const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const crew = new db.crearDB("crews", 'rpg')

module.exports = {
  name: "almacenar", 
  alias: ["guardar"], 
  
async execute (client, message, args){
    let que = args.join(' ')
    let cuanto = args[1]
    let cuanto1 = args[2]

    var alm = [cuanto1 || cuanto?`pez asfur ${cuanto1 || cuanto}`:'pez asfur', cuanto1 || cuanto?`pez dorado ${cuanto1 || cuanto}`:'pez dorado', cuanto1 || cuanto?`pez azul ${cuanto1 || cuanto}`:'pez azul', cuanto1 || cuanto?`carne ${cuanto1 || cuanto}`:'carne', cuanto1 || cuanto?`paleta ${cuanto1 || cuanto}`:'paleta', cuanto1 || cuanto?`manzana ${cuanto1 || cuanto}`:'manzana', cuanto1 || cuanto?`naranja ${cuanto1 || cuanto}`:'naranja', cuanto1 || cuanto?`sushi ${cuanto1 || cuanto}`:'sushi',cuanto1 || cuanto?`omusubi ${cuanto1 || cuanto}`:'omusubi']
    if(!que){return message.channel.send('¿Que deseas almacenar?')}
    if(alm.includes(que) === true){
        let loque;
        let base;
        let base2;
        switch(que){
            case cuanto1 || cuanto?`pez asfur ${cuanto1 || cuanto}`:'pez asfur':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Peces Asfur`:'1 Pez Asfur'
                base = 'pez3'
                base2 = '**<:emoji_1:907978099436711936> Pez Asfur:** '
                break
            case cuanto1 || cuanto?`pez dorado ${cuanto1 || cuanto}`:'pez dorado':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Peces Dorados`:'1 Pez Dorado'
                base = 'pez2'
                base2 = '**🐠 Pez Dorado:** '
                break
            case cuanto1 || cuanto?`pez azul ${cuanto1 || cuanto}`:'pez azul':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Peces Azules`:'1 Pez Azul'
                base = 'pez1'
                base2 = '**🐟 Pez Azul:** '
                break
            case cuanto1 || cuanto?`omusubi ${cuanto1 || cuanto}`:'omusubi':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Omusubi`:'1 Omusubi'
                base = 'omusubi'
                base2 = '**<:omushibi:882246321522741338> Omusubi:** '
                break
            case cuanto1 || cuanto?`sushi ${cuanto1 || cuanto}`:'sushi':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Sushi`:'1 Sushi'
                base = 'sushi'
                base2 = '**🍣 Sushi:** '
                break
            case cuanto1 || cuanto?`naranja ${cuanto1 || cuanto}`:'naranja':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Naranjas`:'1 Naranja'
                base = 'naranja'
                base2 = ''
                break
            case cuanto1 || cuanto?`manzana ${cuanto1 || cuanto}`:'manzana':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Manzanas`:'1 Manzana'
                base = 'manzana'
                base2 = ''
                break
            case cuanto1 || cuanto?`paleta ${cuanto1 || cuanto}`:'paleta':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Paletas`:'1 Paleta'
                base = 'paleta'
                base2 = '**🍭 Paletas:** '
                break
            case cuanto1 || cuanto?`carne ${cuanto1 || cuanto}`:'carne':
                loque = cuanto1 || cuanto?`${cuanto1 || cuanto} Carne`:'1 Carne'
                base = 'carne'
                base2 = '**<:carne:882244710649962526> Carne:** '
                break
        }
        let b = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${base}`)

        if(cuanto? (b < cuanto):(b < 1)){
            message.channel.send("No tienes suficientes items para almacenar.")
            return
        }
        if(cuanto1? (b < cuanto1):(b < 1)){
            message.channel.send("No tienes suficientes items para almacenar.")
            return
        }
        
        
        




        message.channel.send(`Has almacenado ${loque} con exito.`)
        //crew
        let id = await perfil.obtener(`854572979353813032.${message.author.id}.crew.id`)
        let bb1 = await crew.obtener(`854572979353813032.${id}.tripulacion.rcs.${base}`)
        if(bb1 === 0){
            crew.push(`854572979353813032.${id}.tripulacion.recursos`, `${base2}0`)
        }
        crew.extract(`854572979353813032.${id}.tripulacion.recursos`, `${base2}${bb1}`)

        crew.sumar(`854572979353813032.${id}.tripulacion.rcs.${base}`, cuanto1 || cuanto?cuanto1||cuanto:1)
        let bb2 = await crew.obtener(`854572979353813032.${id}.tripulacion.rcs.${base}`)

        crew.push(`854572979353813032.${id}.tripulacion.recursos`, `${base2}${bb2}`)
        crew.sumar(`854572979353813032.${id}.tripulacion.cantidad`, cuanto1 || cuanto?cuanto1||cuanto:1)






        //in
        inventario.extract(`854572979353813032.${message.author.id}.inventarioc`, `${base2}${b}`)

        
        inventario.restar(`854572979353813032.${message.author.id}.comida.${base}`,  cuanto1 || cuanto?cuanto1||cuanto:1)
        let b1 = await inventario.obtener(`854572979353813032.${message.author.id}.comida.${base}`)
        if(b1 === 0){return}
        inventario.push(`854572979353813032.${message.author.id}.inventarioc`, `${base2}${b1}`)
        return
    }

    message.channel.send('No puedes almacenar ' + que)
    

  

 }

}