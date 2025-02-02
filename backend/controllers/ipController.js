const express = require('express');
const multer = require('multer');
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const { promisify } = require('util');
promisify(require('stream').pipeline);
const upload = multer({ dest: 'uploads/' });

function ipController(IP) {
  const router = express.Router();

  /**
   * @swagger
   * /ip:
   *   post:
   *     summary: Enregistre une nouvelle adresse IP avec un nom donné
   *     tags: [IP]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nom:
   *                 type: string
   *               query:
   *                 type: string
   *     responses:
   *       201:
   *         description: Adresse IP enregistrée avec succès
   *       400:
   *         description: Erreur de validation ou de requête
   *       409:
   *         description: Une adresse IP avec ce nom existe déjà
   *       500:
   *         description: Erreur lors de l'enregistrement de l'adresse IP
   */
  router.post("/", async (req, res) => {
    const { nom, query } = req.body;
    if (!query || !nom) {
      return res.status(400).send({ message: "IP address and name are required" });
    }

    try {
      // Vérifier si l'adresse IP existe déjà
      const existingIP = await IP.findOne({ nom: nom });
      if (existingIP) {
        return res.status(409).send({ message: "This IP already exists" });
      }

      // Utiliser l'API ip-api.com pour obtenir les informations de localisation
      const response = await axios.get(`http://ip-api.com/json/${query}`);
      if (response.data.status !== 'success') {
        return res.status(400).send({ message: "Failed to retrieve IP information" });
      }

      // Créer un nouvel objet IP avec les informations récupérées et le nom
      const ipData = { ...response.data, nom };
      const ip = new IP(ipData);

      // Enregistrer l'objet IP dans la base de données
      await ip.save();
      res.status(201).send(ip);
    } catch (error) {
      if (error.code === 11000) {
        // Gérer l'erreur de duplication
        res.status(409).send({ message: "An IP with this name already exists" });
      } else {
        // Gérer les autres erreurs
        res.status(500).send({ message: "Error saving IP information", error: error.message });
      }
    }
  });

  /**
   * @swagger
   * /ip/importCSV:
   *   post:
   *     summary: Importe des adresses IP à partir d'un fichier CSV
   *     tags: [IP]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Importation réussie
   *       400:
   *         description: Erreur de validation lors de l'import
   *       500:
   *         description: Erreur du fichier CSV
   */
  router.post("/importCSV", upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "No CSV file provided" });
    }

    const results = [];

    try {
      // Créer un flux de lecture pour le fichier CSV
      fs.createReadStream(req.file.path)
          .pipe(csv(['nom', 'query'])) // Assurez-vous que les en-têtes correspondent à ceux de votre fichier CSV
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            try {
              // Supprimer le fichier CSV après l'avoir lu
              fs.unlinkSync(req.file.path);

              const errors = [];
              const savePromises = results.map(async (row) => {
                try {
                  // Vérifier si l'adresse IP existe déjà
                  const existingIP = await IP.findOne({ nom: row.nom });
                  if (existingIP) {
                    throw new Error('An IP with this name already exists');
                  }

                  const response = await axios.get(`http://ip-api.com/json/${row.query}`);
                  if (response.data.status === 'success') {
                    const ipData = { ...response.data, nom: row.nom };
                    const ip = new IP(ipData);
                    await ip.save();
                  } else {
                    // Ajouter l'erreur à la liste des erreurs
                    errors.push({ query: row.query, message: response.data.message });
                  }
                } catch (error) {
                  // Ajouter l'erreur à la liste des erreurs
                  errors.push({ query: row.query, error: error.message });
                }
              });

              // Attendre que toutes les promesses soient résolues
              await Promise.all(savePromises);

              if (errors.length > 0) {
                res.status(400).send({ message: "Some IPs could not be imported", errors: errors });
              } else {
                res.status(200).send({ message: "All IPs imported successfully" });
              }
            } catch (error) {
              res.status(500).send({ message: "Error during the import process", error: error.message });
            }
          });
    } catch (error) {
        res.status(500).send({ message: "Error reading the CSV file", error: error.message });
    }
  });

  /**
   * @swagger
   * /ip:
   *   get:
   *     summary: Liste toutes les adresses IP
   *     tags: [IP]
   *     responses:
   *       200:
   *         description: Liste des adresses IP
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/IP'
   */
  router.get("/", async (req, res) => {
    try {
      const ips = await IP.find({});
      res.status(200).send(ips);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving IPs", error: error });
    }
  });

  /**
   * @swagger
   * /ip/{nom}:
   *   get:
   *     summary: Récupère une adresse IP par son nom
   *     tags: [IP]
   *     parameters:
   *       - in: path
   *         name: nom
   *         required: true
   *         schema:
   *           type: string
   *         description: Le nom de l'adresse IP
   *     responses:
   *       200:
   *         description: Détails de l'adresse IP
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IP'
   *       404:
   *         description: Adresse IP non trouvée
   */
  router.get("/:nom", async (req, res) => {
    try {
      const nom = req.params.nom;
      const ip = await IP.findOne({ nom: nom });
      if (!ip) {
        return res.status(404).send({ message: "IP not found with name: " + nom });
      }
      res.status(200).send(ip);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving IP with name: " + req.params.nom, error: error });
    }
  });

  /**
   * @swagger
   * /ip/search/{ip}:
   *   get:
   *     summary: Recherche des informations pour une adresse IP spécifique
   *     tags: [IP]
   *     parameters:
   *       - in: path
   *         name: ip
   *         required: true
   *         schema:
   *           type: string
   *         description: L'adresse IP à rechercher
   *     responses:
   *       200:
   *         description: Informations de l'adresse IP retournées avec succès
   *       404:
   *         description: Informations pour l'adresse IP non trouvées
   *       500:
   *         description: Erreur interne du serveur
   */
  router.get("/search/:ip", async (req, res) => {
    const ipToSearch = req.params.ip;

    try {
      // Vérifier si l'adresse IP existe dans la base de données
      const ipRecord = await IP.findOne({ query: ipToSearch });
      if (ipRecord) {
        // Si l'adresse IP existe, renvoyer les informations stockées
        res.status(200).send(ipRecord);
      } else {
        // Si l'adresse IP n'existe pas, faire une requête à l'API ip-api.com
        const response = await axios.get(`http://ip-api.com/json/${ipToSearch}`);
        if (response.data.status === 'success') {
          // Ajouter le champ 'nom' avec la valeur "unnamed" à la réponse
          const ipData = { ...response.data, nom: "unnamed" };
          res.status(200).send(ipData);
        } else {
          res.status(404).send({ message: "Information for the IP address not found", details: response.data });
        }
      }
    } catch (error) {
      res.status(500).send({ message: "Error retrieving IP information", error: error.message });
    }
  });

  /**
   * @swagger
   * /ip/{nom}:
   *   put:
   *     summary: Met à jour une adresse IP par son nom
   *     tags: [IP]
   *     parameters:
   *       - in: path
   *         name: nom
   *         required: true
   *         schema:
   *           type: string
   *         description: Le nom de l'adresse IP
   *     responses:
   *       200:
   *         description: Adresse IP mise à jour avec succès
   *       400:
   *         description: Erreur de validation ou de requête
   *       404:
   *         description: Adresse IP non trouvée
   */
  router.put("/:nom", async (req, res) => {
    const nom = req.params.nom;
    try {
      // Trouver l'adresse IP par nom
      const ipToUpdate = await IP.findOne({ nom: nom });
      if (!ipToUpdate) {
        return res.status(404).send({ message: "IP not found with name: " + nom });
      }

      // Utiliser l'API ip-api.com pour obtenir les informations de localisation mises à jour
      const response = await axios.get(`http://ip-api.com/json/${ipToUpdate.query}`);
      if (response.data.status !== 'success') {
        return res.status(400).send({ message: "Failed to retrieve IP information" });
      }

      // Mettre à jour l'objet IP avec les nouvelles informations
      const updatedData = response.data;
      await IP.updateOne({ nom: nom }, updatedData);

      // Récupérer l'objet IP mis à jour pour la réponse
      const updatedIP = await IP.findOne({ nom: nom });
      res.status(200).send(updatedIP);
    } catch (error) {
      res.status(500).send({ message: "Error updating IP information", error: error });
    }
  });

  /**
   * @swagger
   * /ip/{nom}:
   *   delete:
   *     summary: Supprime une adresse IP par son nom
   *     tags: [IP]
   *     parameters:
   *       - in: path
   *         name: nom
   *         required: true
   *         schema:
   *           type: string
   *         description: Le nom de l'adresse IP
   *     responses:
   *       200:
   *         description: Adresse IP supprimée avec succès
   *       404:
   *         description: Adresse IP non trouvée
   */
  router.delete("/:nom", async (req, res) => {
    const nom = req.params.nom;
    try {
      const result = await IP.deleteOne({ nom: nom });
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "IP not found with name: " + nom });
      }
      res.status(200).send({ message: "IP deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting IP", error: error });
    }
  });

  return router;
}

module.exports = {
  ipController
};