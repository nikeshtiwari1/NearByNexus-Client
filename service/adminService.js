const axios = require("axios");
const FormData = require("form-data");
const config = require("../config/baseConfig.js");

const getUserList = async (token, pageSize, pageNumber) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/users/list?pageSize=${pageSize}&pageNumber=${pageNumber}`,
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
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

const getPostList = async (token, pageSize, pageNumber) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/posts/list?pageSize=${pageSize}&pageNumber=${pageNumber}`,
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
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

const getCommentList = async (postId, token, pageSize, pageNumber) => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/comments/list?postId=${postId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
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
    // Handle any error that occurred during the API call
    console.error("Error:", error);
    throw new Error("Error:", error);
  }
};

const updateStatus = async (userId, isLocked, token) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/user/status`,
      {
        isLocked: isLocked,
        userId
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


const updatePostStatus = async (postId, isBlocked, token) => {
  try {
    console.log("postId ", postId);
    const response = await axios.post(
      `${config.baseUrl}/post/status`,
      {
        isBlocked: isBlocked,
        postId
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

const updateCommentStatus = async (commentId, isBlocked, token) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/comment/status`,
      {
        isBlocked: isBlocked,
        commentId
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

module.exports = { getUserList, getPostList, getCommentList,updateStatus, updatePostStatus, updateCommentStatus };
