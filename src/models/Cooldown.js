const mongoose = require("mongoose");

const cooldownSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  daily: { type: Number, default: 0 },
  weekly: { type: Number, default: 0 },
  explore: { type: Number, default: 0 },
  sail: { type: Number, default: 0 },
  fish: { type: Number, default: 0 },
  train: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cooldown", cooldownSchema);
