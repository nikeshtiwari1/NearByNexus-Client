const axios = require("axios");
const config = require("../config/baseConfig.js");

const forgetPassword = async (email) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post( `${config.baseUrl}/reset-password`, {
      email,
    });

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

const validateToken = async (token) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.get(
       `${config.baseUrl}/password-reset/request?token=${token}`
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

const changePassword = async (password, confirmPassword, token) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post(
      `${config.baseUrl}/confirm-reset-password`,
      {
        password,
        confirmPassword,
        token
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

module.exports = { forgetPassword, validateToken, changePassword };
