const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     IP:
 *       type: object
 *       required:
 *         - query
 *         - nom
 *         - country
 *         - countryCode
 *         - region
 *         - regionName
 *         - city
 *         - zip
 *         - lat
 *         - lon
 *         - timezone
 *         - isp
 *         - org
 *         - as
 *       properties:
 *         query:
 *           type: string
 *           description: L'adresse IP de la requête
 *         nom:
 *           type: string
 *           description: Le nom associé à l'adresse IP
 *         country:
 *           type: string
 *         countryCode:
 *           type: string
 *         region:
 *           type: string
 *         regionName:
 *           type: string
 *         city:
 *           type: string
 *         zip:
 *           type: string
 *         lat:
 *           type: number
 *         lon:
 *           type: number
 *         timezone:
 *           type: string
 *         isp:
 *           type: string
 *         org:
 *           type: string
 *         as:
 *           type: string
 */
const ipSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  regionName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  isp: {
    type: String,
    required: true
  },
  org: {
    type: String,
    required: true
  },
  as: {
    type: String,
    required: true
  }
});

const IP = mongoose.model('IP', ipSchema);

module.exports = IP;