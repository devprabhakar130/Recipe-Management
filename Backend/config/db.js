
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recipesDB";

  try {
   
    await mongoose.connect(uri);

    const { host, name } = mongoose.connection;
    console.log(`✅ MongoDB connected → ${host}/${name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    
  }
}

module.exports = connectDB;
