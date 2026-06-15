require("dotenv").config();
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
const { loadCommands } = require("./src/core/commandLoader");
const { loadEvents } = require("./src/core/eventLoader");
const connectDB = require("./src/database/index");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.prefix = process.env.PREFIX || "op!";

const { commands, slashData } = loadCommands(path.join(__dirname, "src", "commands"));
client.commands = commands;

loadEvents(client, path.join(__dirname, "src", "events"));

(async () => {
  await connectDB();
  client.login(process.env.TOKEN);
})();
