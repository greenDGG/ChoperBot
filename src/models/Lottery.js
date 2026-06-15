const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema({
  pot: { type: Number, default: 0 },
  participants: [{ type: String }],
  lastWinners: [{ id: String, amount: Number }],
  lastDrawDate: { type: String, default: "" },
});

module.exports = mongoose.model("Lottery", lotterySchema);
