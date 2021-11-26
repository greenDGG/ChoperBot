const Discord = require("discord.js");
const client = new Discord.Client({  ws: {intents: Discord.Intents.ALL}})
const prefix = "op!";



const db = require('megadb');
const perfil = new db.crearDB("perfil", 'rpg')

let afk = new db.crearDB("afk");
const cool = new db.crearDB('cooldown', 'rpg')
const cools = new db.crearDB('csc', 'rpg')
const carcel = new db.crearDB('carcel', 'rpg') 
const { cdFunc } = require("./cooldown")


const fs = require("fs")
 
let { readdirSync } = require('fs'); 
const { assert } = require("console");





/////////7hanled
client.commands = new Discord.Collection();
const rpgFiles2 = fs.readdirSync('./comandos/rpg/info').filter(file => file.endsWith('.js'));
const rpgFiles3 = fs.readdirSync('./comandos/rpg/xp').filter(file => file.endsWith('.js'));

const rpgFiles = fs.readdirSync('./comandos/rpg').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));


for (const file of rpgFiles3) {
  const command = require(`./comandos/rpg/xp/${file}`);
  client.commands.set(command.name, command);
}
for (const file of rpgFiles2) {
  const command = require(`./comandos/rpg/info/${file}`);
  client.commands.set(command.name, command);
}

for (const file of rpgFiles) {
  const command = require(`./comandos/rpg/${file}`);
  client.commands.set(command.name, command);
}
for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

/*/nos
let y = process.openStdin()
y.addListener("data", res => {
  let x = res.toString().trim().split(/ +/g)
  

  client.channels.cache.get("899136745667448844").send(x)
})*/
//////el aviso
client.on("ready", async() => {
  console.log("Listo Papi!");
  presence();

  cdFunc(client)
    


 
  

    

  
}); 

///////presencia

function presence(){
  client.user.setPresence({
     status: "online",
     activity: {
        name: "❄️La Nieve❄️ | op!help",
        
        type: "WATCHING",
        
     }
  })
}




//////////la cosa del prefix

client.on("message", async(message)=> { 
  if (message.author.bot) return;

  if(afk.tiene(message.author.id + '.afk')){
    
    message.channel.send(`:fish_cake:Bienvenido de nuevo pirata ${message.author} Ya quité tu AFK.:fish_cake:`)
    afk.eliminar(message.author.id + '.afk')
    afk.eliminar(message.author.id + '.messageafk')
    }

    message.mentions.users.forEach(user => {
      if (afk.tiene(user.id + '.afk')) message.reply(':fish_cake:El pirata ' + user.tag + ' esta afk !:fish_cake:')
    })
 
  
  

  
 

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();
  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
    let s = message.author.id
    let a = "674758623204999168"
    /*if(s !== a){return message.reply("Estoy en reparacion...")}*/

if(!carcel.tiene(`854572979353813032.${message.author.id}`)){
  carcel.establecer(`854572979353813032.${message.author.id}`, {atrapado: 0,nivel: 0, fuerza: 0})
}
let atr = await carcel.obtener(`854572979353813032.${message.author.id}.atrapado`)
let nivel = await carcel.obtener(`854572979353813032.${message.author.id}.nivel`)
if(atr === 1){return message.channel.send(`Estas atrapado en una carcel nivel ${nivel}, pidele a tus nakamas que te salven\n` + '`op!rescatar @usuario`')} 
    /*let id = '674758623204999168'
    let author = message.author.id
  
  if(author != id){return}*/
  cmd.execute(client, message, args)
  
  }
  const user = message.author;
 

  if (command === 'afk') {
    message.channel.send(`:fish_cake::zzz:El pirata ${user} está tomando un siesta:zzz::fish_cake: ${message.content.split(' ').slice(2)?`Por: ${message.content.split(' ').slice(2)}`:''}`)

  afk.establecer(message.author.id + '.afk','true')
  afk.establecer(message.author.id + '.messageafk', message.content.split(' ').slice(2)) 
  
} 




  

        
  


    

  


 





  });

client.login("ODUwNDc5ODYzNjI1Mjg1Njcz.YLqVGA.HMv2GmYgNp-ByO6Zgywu0pQO6tM");