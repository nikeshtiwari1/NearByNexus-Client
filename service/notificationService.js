const config = require('../config/baseConfig.js');
const axios = require("axios");

const getAllNotifications = async (token) => {
    try {
      const response = await axios.get(`${config.baseUrl}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Extract the data from the response
      const notifications = response.data;
      // Pass the data to the view
      return { notifications };
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Error:", error);
      throw new Error("Error:", error);
    }
  };

  module.exports = {getAllNotifications}