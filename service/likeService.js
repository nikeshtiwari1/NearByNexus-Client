const axios = require("axios");
const config = require('../config/baseConfig.js');

const postLike = async (postId, token) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        `${config.baseUrl}/like`,
        {
            postId,
        },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
  
      // Extract the data from the response
      const data = response.data;
  
      // Pass the data to the view
      return { data };
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Error:", error);
      return null;
    }
  };

  const postInterest = async (postId, token) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        `${config.baseUrl}/interest`,
        {
            postId,
        },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
  
      // Extract the data from the response
      const data = response.data;
  
      // Pass the data to the view
      return { data };
    } catch (error) {
      // Handle any error that occurred during the API call
      console.error("Error:", error);
      return null;
    }
  };

  module.exports = {postLike,postInterest}