const axios = require("axios");
const FormData = require('form-data');
const config = require('../config/baseConfig.js');

const getUserList = async (token, pageSize,pageNumber) => {
    try {
      const response = await axios.get(`${config.baseUrl}/users/list?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const getPostList = async (token, pageSize,pageNumber) => {
    try {
      const response = await axios.get(`${config.baseUrl}/posts/list?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


  module.exports = {getUserList, getPostList};