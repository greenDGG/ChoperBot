const { ActivityType } = require("discord.js");
const { cdFunc } = require("../core/cooldown");
const { deployCommands } = require("../core/deployCommands");

module.exports = {
  execute(client) {
    console.log("[Bot] Listo Papi!");
    client.user.setPresence({
      status: "online",
      activities: [{ name: "❄️La Nieve❄️ | op!help", type: ActivityType.Watching }],
    });
    const { slashData } = require("../core/commandLoader");
    deployCommands(slashData);
    cdFunc(client);
  },
};
