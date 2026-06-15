const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  crewId: { type: String, default: '' },
  inventory: { type: String, default: '' },
  area: {
    mar: { type: String, default: '' },
    isla: { type: String, default: '' },
    areas: { type: Number, default: 1 },
    maxarea: { type: Number, default: 1 },
  },
  role: { type: Number, default: 0 },
  bank: {
    deposited: { type: Number, default: 0 },
    cash: { type: Number, default: 10000 },
  },
  haki: [{
    id: { type: Number, default: 1 },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
  }],
  bio: { type: String, default: 'Yo sere el Rey...' },
  nameChanges: { type: Number, default: 3 },
  progress: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    bounty: { type: Number, default: 0 },
  },
  stats: {
    energy: {
      current: { type: Number, default: 100 },
      max: { type: Number, default: 100 },
    },
    health: {
      current: { type: Number, default: 100 },
      max: { type: Number, default: 100 },
    },
    atk: { type: Number, default: 10 },
    def: { type: Number, default: 10 },
  },
  equipped: {
    gun: { type: Number, default: 0 },
    fruit: { type: Number, default: 0 },
    ship: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
