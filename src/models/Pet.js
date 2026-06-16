const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  petId: { type: Number, default: 0 },
  name: { type: String, default: "" },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpMax: { type: Number, default: 200 },
  acquiredAt: { type: String, default: "" },
  img: { type: String, default: "" },
  atk: { type: Number, default: 0 },
  def: { type: Number, default: 0 },
  hp: { type: Number, default: 50 },
  hpMax: { type: Number, default: 50 },
});

module.exports = mongoose.model("Pet", petSchema);
