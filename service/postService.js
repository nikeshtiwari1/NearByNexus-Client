const axios = require("axios");
const config = require('../config/baseConfig.js');
const FormData = require('form-data');

const savePost = async (title,postDescription,latitude,longitude,locationName,startDate,endDate,postType,image,token) => {
  try {
    // Make a POST request to the login endpoint
    const formData = new FormData();

    // Add form fields to the FormData
    formData.append('title', title);
    formData.append('postDescription', postDescription);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('locationName', locationName);

    if(startDate)
    formData.append('startDate', startDate);
    if(endDate)
    formData.append('endDate', endDate);
    formData.append('postType', postType);

    // Append the image data from req.file
    if(image)
    formData.append('image', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });
    const headers = formData.getHeaders();

    headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.post(`${config.baseUrl}/post`, formData,
    {
      headers,
    }
    );

    // Extract the data from the response
    const data = response.data;

    // Pass the data to the view
    return { data };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
      throw new Error("Error:", error);
    }
  }
};

const getAllPost = async (token) => {
  try {
    const response = await axios.get(`${config.baseUrl}/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the data from the response
    const posts = response.data.posts;

    // Pass the data to the view
    return { posts };
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

const getPostDetail = async (postId,token) => {
  try {
    const response = await axios.get(`${config.baseUrl}/post/details?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the data from the response
    const posts = response.data;

    // Pass the data to the view
    return { posts };
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


const getAllPostByLocation = async (longitude,latitude,token) => {
  try {
    const response = await axios.get(`${config.baseUrl}/post?latitude=${latitude}&longitude=${longitude}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the data from the response
    const posts = response.data;

    // Pass the data to the view
    return { posts };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
      throw new Error("Error:", error);
    }
   
  }
};


module.exports = {savePost, getAllPost, getAllPostByLocation, getPostDetail};