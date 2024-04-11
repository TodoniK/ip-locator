const express = require('express');
const axios = require('axios'); // Assurez-vous d'installer axios avec npm ou yarn

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
   */
  router.post("/", async (req, res) => {
    const { nom, query } = req.body;
    if (!query || !nom) {
      return res.status(400).send({ message: "IP address and name are required" });
    }

    try {
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
      res.status(500).send({ message: "Error saving IP information", error: error });
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