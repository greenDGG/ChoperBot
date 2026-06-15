const { REST, Routes } = require("discord.js");

async function deployCommands(slashData) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: slashData }
    );
    console.log(`[Slash] ${slashData.length} comandos registrados`);
  } catch (err) {
    console.error("[Slash] Error al registrar comandos:", err);
  }
}

module.exports = { deployCommands };
