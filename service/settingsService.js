
const axios = require("axios");
const config = require('../config/baseConfig.js');
const updateSettings = async (
    isPushEnabled,
  token
) => {
  try {
   
    const response = await axios.post(
      `${config.baseUrl}/notifications/setting`,
      {
        isPushEnabled:isPushEnabled,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    // Pass the data to the view
    return { data };
  } catch (error) {
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

const getSettings = async (
  token
) => {
  try {
   
    const response = await axios.get(
      `${config.baseUrl}/notifications/setting`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    // Pass the data to the view
    return { data };
  } catch (error) {
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

module.exports = {updateSettings,getSettings}