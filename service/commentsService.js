const axios = require("axios");
const config = require('../config/baseConfig.js');

const postComment = async (postId, comment, token) => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        `${config.baseUrl}/comment`,
        {
            postId,
            comment,
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
      throw new Error("Error:", error);
    }
  };

  module.exports = {postComment}