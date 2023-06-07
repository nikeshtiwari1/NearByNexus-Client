const axios = require("axios");

const login = async (email, password) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
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

const register = async (name, email, password, phoneNumber, dateOfBirth) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post("http://localhost:3000/register", {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth
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


const getProfile = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Extract the data from the response
    const data = response.data.detail;

    // Pass the data to the view
    return { data };
  } catch (error) {
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

module.exports = { login, register,getProfile };
