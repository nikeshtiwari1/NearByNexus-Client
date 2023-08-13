require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://api-nearbunexus.onrender.com'
};

module.exports = config;
