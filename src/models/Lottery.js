const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  winnerId: { type: String, required: true },
  prize: { type: Number, default: 0 },
  claimed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lottery", lotterySchema);
