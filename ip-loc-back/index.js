require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8w9vhnm.mongodb.net/?retryWrites=true&w=majority`;

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
const port = 8080;

// Route pour servir la documentation Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

run().catch(console.error);
