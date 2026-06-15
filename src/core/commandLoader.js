const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

let _slashData = [];

function loadCommands(dir) {
  const commands = new Collection();
  const slashData = [];
  const baseDir = path.resolve(dir);

  function scan(directory) {
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith(".js")) {
        const cmd = require(fullPath);
        commands.set(cmd.name, cmd);
        if (cmd.alias) {
          for (const a of cmd.alias) {
            commands.set(a, cmd);
          }
        }
        if (cmd.options) {
          slashData.push({
            name: cmd.name,
            description: cmd.description || "Sin descripción",
            options: cmd.options,
          });
        } else {
          slashData.push({
            name: cmd.name,
            description: cmd.description || "Sin descripción",
          });
        }
      }
    }
  }

  scan(baseDir);
  _slashData = slashData;
  return { commands, slashData };
}

function getCommand(name, commands) {
  return commands.get(name);
}

module.exports = { loadCommands, getCommand, get slashData() { return _slashData; } };
