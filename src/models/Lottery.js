const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema({
  pozo: { type: Number, default: 0 },
  participantes: [{ type: String }],
  ultimosGanadores: [{ id: String, monto: Number }],
  sorteado: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lottery", lotterySchema);
