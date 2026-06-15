const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  capacity: {
    players: { type: Number, default: 0 },
    resource: { type: Number, default: 0 },
  },
  resource: [{
    id: { type: String, default: '' },
    amount: { type: Number, default: 0 },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Ship', shipSchema);
