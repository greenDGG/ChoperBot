const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
  flag: {
    active: { type: Boolean, default: false },
    url: { type: String, default: '' },
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  maxPlayers: { type: Number, default: 10 },
  ownerId: { type: String, default: '' },
  shipId: { type: String, default: '' },
  resources: { type: Map, of: Number, default: {} },
  totalResources: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Crew', crewSchema);
