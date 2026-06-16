const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema({
  pot: { type: Number, default: 0 },
  participants: [{ type: String }],
  lastWinners: [{ id: String, amount: Number }],
  lastDrawDate: { type: String, default: '' },
  ticketPrice: { type: Number, default: 1000 },
  drawn: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lottery", lotterySchema);
