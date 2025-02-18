require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase, pingDatabase } = require('./db/database');
const { ipController } = require('./controllers/IPController');
const IP = require('./models/IP');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const app = express();
const port = 8089;

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
  apis: ['./models/*.js', './controllers/*.js'], // Emplacement des fichiers contenant les annotations Swagger
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Write swagger.json to static folder
fs.writeFile('./swagger.json', JSON.stringify(swaggerSpec, null, 2), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully generated swagger.json');
  }
});

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

app.use(cors({
  origin: process.env.FRONT_URL
}));

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
