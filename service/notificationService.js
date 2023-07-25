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
      if (error.response && error.response.status === 403) {
        window.location.href = '/logout';
      } else {
        // Handle other errors
        console.error('Error:', error);
        throw new Error("Error:", error);
      }
    }
  };

  const getNotificationsCount = async (token) => {
    try {
      const response = await axios.get(`${config.baseUrl}/notifications/count`, {
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
      if (error.response && error.response.status === 403) {
        window.location.href = '/logout';
      } else {
        // Handle other errors
        console.error('Error:', error);
        throw new Error("Error:", error);
      }
    }
  };

  const setNotificationViewed = async (token) => {
    try {
      const response = await axios.get(`${config.baseUrl}/notifications/viewed`, {
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
      if (error.response && error.response.status === 403) {
        window.location.href = '/logout';
      } else {
        // Handle other errors
        console.error('Error:', error);
        throw new Error("Error:", error);
      }
    }
  };

  module.exports = {getAllNotifications,getNotificationsCount, setNotificationViewed }