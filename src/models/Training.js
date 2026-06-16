const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model("Training", trainingSchema);
