const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/choperbot";
  await mongoose.connect(uri);
  console.log("[DB] Conectado a MongoDB");
}

module.exports = connectDB;
