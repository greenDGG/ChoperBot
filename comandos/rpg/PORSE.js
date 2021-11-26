const Discord = require('discord.js');

module.exports = {
  name: "aa", 
  alias: [""], 
  
async execute (client, message, args){

    let porsentaje = (Math.floor(Math.random() * 100)) + 1
    let cosa = args.join(' ')
    if(!cosa){
        message.channel.send("Debes decir que quieres abrir.")
        return
    }
    if(cosa == 'cofre comun'){
        let berri = (Math.floor(Math.random() * 10000)) + 1
        const embed = new Discord.MessageEmbed()
        .setDescription(`**<:cofrecomun:890255012138205255> Cofre Comun Abierto**\n<:berri:886472816554287124>${berri}\n`)
        message.channel.send(embed)
    }
return
   if((porsentaje) <= 5){
       message.channel.send(`tu porsentaje es = o menor a 5\n es ${porsentaje}`)
       return
   }
   if((porsentaje) <= 15){
    message.channel.send(`tu porsentaje es = o menor a 15\n es ${porsentaje}`)
    return
}
if((porsentaje) <= 20){
    message.channel.send(`tu porsentaje es = o menor a 20\n es ${porsentaje}`)
    return
}
if((porsentaje) <= 30){
    message.channel.send(`tu porsentaje es = o menor a 30\n es ${porsentaje}`)
    return
}
if((porsentaje) <= 50){
    message.channel.send(`tu porsentaje es = o menor a 50\n es ${porsentaje}`)
    return
}
if((porsentaje) >= 51){
    message.channel.send(`tu porsentaje es = o mayor a 51\n es ${porsentaje}`)
    return
}





  

 }

} 