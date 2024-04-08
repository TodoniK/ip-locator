require('dotenv').config();
const express = require('express');
const { connectToDatabase, pingDatabase } = require('./db/database');
const { ipController } = require('./controllers/IPController');
const IP = require('./models/IP');

const app = express();
const port = process.env.PORT || 8080;

app.use("/ip", ipController(IP));

function startServer() {
  app.listen(port, () => {
    console.log(`[RUN] App listening on 127.0.0.1:${port}`);
  });
}

async function run() {
  try {
    await connectToDatabase();
    await pingDatabase();
    startServer();
  } catch (error) {
    console.error("Could not connect to the database", error);
  }
}

run().catch(console.error);
