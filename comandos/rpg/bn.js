const Discord = require('discord.js');

module.exports = {
  name: "bn", 
  alias: [""], 
  
async execute (client, message, args){


  if(message.author.id != '674758623204999168'){return}
  var n = [1,2,3,4,5]
  n.forEach(obj => {
    let img;
    switch(obj){
      case 5:
        //yoxd
        img = 'https://cdn.discordapp.com/attachments/894791234776887316/911229607884247101/Denis.png'
        break;
      case 4:
        //zxgo
        img = 'https://cdn.discordapp.com/attachments/894791234776887316/911229493719494716/el_matador_guerrero.png'
        break;
      case 3:
        //denisse
        img = 'https://cdn.discordapp.com/attachments/894791234776887316/911229476447354940/denisse.png'
        break;
      case 2:
        //xp921
        img = 'https://cdn.discordapp.com/attachments/894791234776887316/911229597465591858/XP921.png'
        break;
      case 1:
        //trax
        img = 'https://cdn.discordapp.com/attachments/894791234776887316/911229561918877706/KataTrax.png'
        break;
    }

    const embed = new Discord.MessageEmbed()
    
    .setTitle("¡¡SE BUSCA!!")
    .setColor("RED")
    .setImage(img)
    .setTimestamp()
    message.channel.send(embed)
    
  });
 



    
    message.delete();

  

 }

} 