const mongoose = require("mongoose");

const prisonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  atrapado: { type: Number, default: 0 },
  nivel: { type: Number, default: 0 },
  fuerza: { type: Number, default: 0 },
});

module.exports = mongoose.model("Prison", prisonSchema);
