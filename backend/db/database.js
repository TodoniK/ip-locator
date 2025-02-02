const mongoose = require("mongoose");

async function connectToDatabase() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ip-locator.wn5of.mongodb.net/?retryWrites=true&w=majority&appName=ip-locator`;
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