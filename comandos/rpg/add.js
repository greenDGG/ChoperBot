const Discord = require('discord.js');
const db = require("megadb")
const perfil = new db.crearDB("perfil", 'rpg')
const inventario = new db.crearDB('inventario', 'rpg')
const crew = new db.crearDB("crews", 'rpg')

module.exports = {
  name: "add", 
  alias: [""], 
  
async execute (client, message, args){
    if(message.author.id != '674758623204999168'){return}
    let mencion = message.mentions.users.first()
    let que = args[1]
    let cuanto = args[2]
    let c = Math.abs(cuanto)
    let rol = await perfil.obtener(`854572979353813032.${mencion.id}.perfil.rol`)


    message.channel.send('Listo')
    switch(que){
        case 'nivel':
            perfil.sumar(`854572979353813032.${mencion.id}.progreso.nivel`, c)
            let nivell = await perfil.obtener(`854572979353813032.${mencion.id}.progreso.nivel`)//obtiene el nivel actual
            perfil.sumar(`854572979353813032.${mencion.id}.progreso.maxp`, 5 * (nivell ** 2) + 50 * nivell + 125)//suma el maximo de xp
            let vd;
            let at;
            let def;
            switch(rol){
              case '🤖 Cyborg':
                vd = 5
                at = 6
                def = 8
                break;
              case '🧭 Navegante':
                vd = 5
                at = 3
                def = 3
                break;
              case '🔫 Tirador':
                vd = 5
                at = 4
                def = 2
                break;
              case '🔍 Arqueologa':
                vd = 5
                at = 2
                def = 2
                break;
              case '🔍 Arqueologo':
                vd = 5
                at = 2
                def = 2
                break;
              case '<:espadachin:906596039535001601> Espadachin':
                vd = 5
                at = 2
                def = 4
                break;
              case '<:SimboloHospital:901623144631128135> Doctora':
                vd = 15
                at = 2
                def = 2
                break;
              case '<:SimboloHospital:901623144631128135> Doctor':
                vd = 15
                at = 2
                def = 2
                break;
            }
            perfil.sumar(`854572979353813032.${mencion.id}.estadisticas.ataque`, at*c)//suma el at
            perfil.sumar(`854572979353813032.${mencion.id}.estadisticas.defenza`, def*c)//suma la defenza
            perfil.sumar(`854572979353813032.${mencion.id}.estadisticas.maxvida`, vd*c)//suma el maximo de vida
            perfil.sumar(`854572979353813032.${mencion.id}.estadisticas.maxenergia`, 1*c)//suma el maximo de energia 

            let id = await perfil.obtener(`854572979353813032.${mencion.id}.crew.id`)//obtiene id de crew 
            let cr = await perfil.obtener(`854572979353813032.${mencion.id}.crew.tripu`)//ve si tiene crew
            
            if(cr === 1){
              crew.sumar(`854572979353813032.${id}.tripulacion.estad.at`, at*c)//suma at en el crew
              crew.sumar(`854572979353813032.${id}.tripulacion.estad.def`, def*c)//suma def en el crew
            }
            break
        case 'xp':
            perfil.sumar(`854572979353813032.${mencion.id}.progreso.xp`, c)
            break
        case 'dinero':
            perfil.sumar(`854572979353813032.${mencion.id}.money.dinero`, c)  
            break  
    }

  

 }

}
