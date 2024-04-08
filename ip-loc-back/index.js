require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8w9vhnm.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("[SETUP] Connected successfully to the database using Mongoose");
  } catch (error) {
    console.error("Could not connect to the database", error);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.error);
