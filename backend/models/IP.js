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
 *           description: Le nom du pays
 *         countryCode:
 *           type: string
 *           description: Le code du pays
 *         region:
 *           type: string
 *           description: Le code de la région
 *         regionName:
 *           type: string
 *           description: Le nom de la région
 *         city:
 *           type: string
 *           description: Le nom de la ville
 *         zip:
 *           type: string
 *           description: Le code postal
 *         lat:
 *           type: number
 *           description: La latitude
 *         lon:
 *           type: number
 *           description: La longitude
 *         timezone:
 *           type: string
 *           description: Le fuseau horaire
 *         isp:
 *           type: string
 *           description: Le fournisseur d'accès à Internet
 *           nullable: true
 *         org:
 *           type: string
 *           description: L'organisation
 *           nullable: true
 *         as:
 *           type: string
 *           description: Le système autonome
 *           nullable: true
 */
const ipSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true
  },
  nom: {
    type: String,
    required: true,
    unique: true,
    index: true
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
    required: false
  },
  org: {
    type: String,
    required: false
  },
  as: {
    type: String,
    required: false
  }
});

const IP = mongoose.model('IP', ipSchema);

module.exports = IP;