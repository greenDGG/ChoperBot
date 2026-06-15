const fs = require("fs");
const path = require("path");

function loadEvents(client, dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
  for (const file of files) {
    const event = require(path.join(dir, file));
    const name = file.replace(".js", "");
    client.on(name, (...args) => event.execute(client, ...args));
  }
}

module.exports = { loadEvents };
