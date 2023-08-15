require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
};

module.exports = config;
