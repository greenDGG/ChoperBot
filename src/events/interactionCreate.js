const Prison = require("../models/Prison");

module.exports = {
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    const prison = await Prison.findOne({ id: interaction.user.id });
    if (prison && prison.atrapado === 1) {
      return interaction.reply({
        content: `Estas atrapado en una carcel nivel ${prison.nivel}, pidele a tus nakamas que te salven`,
        ephemeral: true,
      });
    }

    cmd.execute(client, interaction);
  },
};
