const adminService = require("../service/adminService.js");
const homeService = require("../service/homeService.js");

const admin = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const pageSize = 10; // Number of items to display per page
    const pageNumber = parseInt(req.query.page || 1, 10);
    const profile = await homeService.getProfile(req.session.token);
    const users = await adminService.getUserList(
      req.session.token,
      pageSize,
      pageNumber
    );
    res.render("admin/admin.ejs", {
      imageUrl: profile.data.imageUrl,
      users: users.data.users,
      pageNumber,
      pageSize,
      totalPages: users.data.totalPages,
    });
  } else res.render("login.ejs");
};

const getPosts = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const pageSize = 10; // Number of items to display per page
    const pageNumber = parseInt(req.query.page || 1, 10);
    const posts = await adminService.getPostList(
      req.session.token,
      pageSize,
      pageNumber
    );
    res.render("admin/posts.ejs", {
        posts: posts.data.posts,
      pageNumber,
      pageSize,
      totalPages: posts.data.totalPages,
    });
  } else res.render("login.ejs");
};

const getComments = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const postId = req.query.postId;
    const pageSize = 10; // Number of items to display per page
    const pageNumber = parseInt(req.query.page || 1, 10);
    const comments = await adminService.getCommentList(postId,
      req.session.token,
      pageSize,
      pageNumber
    );
    res.render("admin/comments.ejs", {
      comments: comments.data.comments,
      pageNumber,
      pageSize,
      totalPages: comments.data.totalPages,
      postId:postId
    });
  } else res.render("login.ejs");
};

const updateStatus = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const {userId, isLocked}= req.body;
    console.log("USER DETAILS",{userId,isLocked});
    const data = await adminService.updateStatus(userId,isLocked,
      req.session.token
    );
    res.json({ data});
  } else res.render("login.ejs");
};

const updatePostStatus = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const {postId, isBlocked}= req.body;
    const data = await adminService.updatePostStatus(postId,isBlocked,
      req.session.token
    );
    res.json({ data});
  } else res.render("login.ejs");
};

const updateCommentStatus = async (req, res) => {
  if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  ) {
    const {commentId, isBlocked}= req.body;
    const data = await adminService.updateCommentStatus(commentId,isBlocked,
      req.session.token
    );
    res.json({ data});
  } else res.render("login.ejs");
};

module.exports = { admin, getPosts, getComments,updateStatus, updatePostStatus, updateCommentStatus };
