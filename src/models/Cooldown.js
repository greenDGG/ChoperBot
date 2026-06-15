const mongoose = require("mongoose");

const cooldownSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  daily: { type: Number, default: 0 },
  weekly: { type: Number, default: 0 },
  work: { type: Number, default: 0 },
  rob: { type: Number, default: 0 },
  explore: { type: Number, default: 0 },
  duel: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cooldown", cooldownSchema);
