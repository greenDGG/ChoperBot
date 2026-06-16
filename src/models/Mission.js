const mongoose = require("mongoose");

const missionProgressSchema = new mongoose.Schema({
  missionId: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  target: { type: Number, required: true },
  completed: { type: Boolean, default: false },
}, { _id: false });

const missionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  activeMissions: [missionProgressSchema],
  cooldownUntil: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Mission", missionSchema);
