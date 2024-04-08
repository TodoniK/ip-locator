const mongoose = require('mongoose');

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