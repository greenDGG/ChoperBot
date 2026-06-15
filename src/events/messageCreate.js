const Prison = require("../models/Prison");

module.exports = {
  async execute(client, message) {
    if (message.author.bot) return;
    const prefix = client.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName);

    if (!cmd) return;

    const prison = await Prison.findOne({ id: message.author.id });
    if (prison && prison.atrapado === 1) {
      return message.channel.send(
        `Estas atrapado en una carcel nivel ${prison.nivel}, pidele a tus nakamas que te salven\n\`op!rescatar @usuario\``
      );
    }

    cmd.execute(client, message, args);
  },
};
