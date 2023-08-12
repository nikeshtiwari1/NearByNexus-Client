const axios = require("axios");
const FormData = require('form-data');
const config = require('../config/baseConfig.js');

const login = async (email, password) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post(`${config.baseUrl}/login`, {
      email,
      password,
    });

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
    }
  }
};

const register = async (name, email, password, phoneNumber, dateOfBirth) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post(`${config.baseUrl}/register`, {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
    });

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
    }
  }
};

const updateProfile = async (
  name,
  phoneNumber,
  dateOfBirth,
  address,
  token
) => {
  try {
    // Make a POST request to the login endpoint
    const response = await axios.post(
      `${config.baseUrl}/profile`,
      {
        name,
        phoneNumber,
        dateOfBirth,
        address,
      },
      {
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
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
};

const updateToken = async (
  deviceToken,
  token
) => {
  try {
    // Make a POST request to the login endpoint
    console.log("making tequest",deviceToken);
    const response = await axios.post(
      `${config.baseUrl}/update/token`,
      {
        token:deviceToken,
      },
      {
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
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
};

const getProfile = async (token) => {
  try {
    const response = await axios.get(`${config.baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the data from the response
    const data = response.data.detail;

    // Pass the data to the view
    return { data };
  } catch (error) {
    // Handle any error that occurred during the API call
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
};

const getImages = async (filename) => {
  try {
    const response = await axios.get(`${config.baseUrl}/post/images/${filename}`, {
    });

    // Extract the data from the response
    const data = response.data.detail;

    // Pass the data to the view
    return { data };
  } catch (error) {
    // Handle any error that occurred during the API call
    if (error.response && error.response.status === 403) {
      window.location.href = '/logout';
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
};

const logout = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the data from the response
    const data = response.data.detail;

    // Pass the data to the view
    return { data };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return null;
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
};

const uploadProfileImage = async (image,token) => {
  try {
    // Make a POST request to the login endpoint
    const formData = new FormData();

    // Append the image data from req.file
    if(image)
    formData.append('image', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });
    const headers = formData.getHeaders();

    headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.post(`${config.baseUrl}/profile/image`, formData,
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
    }
  }
};


module.exports = { login, register, getProfile, updateProfile,updateToken,logout, uploadProfileImage,getImages  };
