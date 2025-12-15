const mongoose = require("mongoose");

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI
  await mongoose.connect(uri);
  console.log("[SETUP] Connected successfully to the database using Mongoose");
}

async function pingDatabase() {
  try {
    await mongoose.connection.db.admin().ping();
    console.log("[DEBUG] Database pinged successfully");
  } catch (error) {
    console.error("[DEBUG] Could not ping the database", error);
  }
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectToDatabase,
  pingDatabase,
  disconnectFromDatabase
}