const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  items: { type: Map, of: Number, default: {} },
});

module.exports = mongoose.model("Inventory", inventorySchema);
