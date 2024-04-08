require('dotenv').config();
const express = require('express');
const { connectToDatabase, pingDatabase } = require('./db/database');
const { ipController } = require('./controllers/IPController');
const IP = require('./models/IP');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 8080;

// Options de configuration pour swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'IP Locator',
      version: '1.0.0',
      description: 'Documentation de l\'API IP Locator permettant de localiser une adresse IP',
    },
  },
  apis: ['./routes/*.js'], // Emplacement des fichiers contenant les annotations Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
