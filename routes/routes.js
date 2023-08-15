const express = require("express");
const multer = require('multer');
const upload = multer();
const { checkAuth,checkAdminAuth } = require("../service/authService.js");
const {
  home,
  register,
  login,
  registerUser,
  profile,
  logout,
  updateProfile,
  updateToken,
  uploadProfileImage,
  getImages
} = require("../contoller/homecontoller.js");

const eventController = require("../contoller/eventController.js");
const passwordController = require("../contoller/passwordController.js");
const notificationController = require("../contoller/notificationContoller.js");
const commentController = require("../contoller/commentController.js");
const likeController = require("../contoller/likeController.js");
const settingsController = require("../contoller/settingsController.js");
const adminController = require("../contoller/adminController.js");

const router = express.Router();
router.get("/", checkAuth, home);
router.get("/login", home);
router.post("/login", login);

router.post("/forget-password", passwordController.forgetPassword);
router.get("/password-reset/request", passwordController.validateToken);
router.get("/change-password", passwordController.changePassword);
router.post("/change-password", passwordController.confirmChangePassword);

router.get("/register", register);
router.post("/register", registerUser);

router.get("/profile",checkAuth, profile);

router.get('/get/images/:filename', getImages);

router.post("/profile",checkAuth, updateProfile);

router.post("/saveToken",checkAuth, updateToken);

router.get("/logout", logout);

router.get("/event", checkAuth, eventController.event);

router.get("/nearby/events", checkAuth, eventController.getNearByEvents);

router.post("/savePost",checkAuth,upload.single('image'), eventController.savePost);

router.post("/uploadProfileImage",checkAuth,upload.single('image'), uploadProfileImage);

router.get("/eventDetail",checkAuth, eventController.getEventDetail);

router.get("/postDetails",checkAuth, eventController.getPostDetail);

router.post("/post/comments",checkAuth, commentController.postComment);

router.post("/post/like",checkAuth, likeController.likePost);

router.post("/post/interest",checkAuth, likeController.interestPost);

router.post("/updateSettings", checkAuth, settingsController.updateSettings);
router.get("/settings",checkAuth, settingsController.settings);

router.get("/notifications", checkAuth, notificationController.notifications);
router.get("/getNotificationCount", checkAuth, notificationController.getNotificationCount);
router.get("/notificationsViewed", checkAuth, notificationController.notificationsViewed);


router.get("/admin", checkAdminAuth, adminController.admin);
router.get("/adminPosts", checkAdminAuth, adminController.getPosts);
router.get("/adminComments", checkAdminAuth, adminController.getComments);
router.post("/updateStatus", checkAdminAuth, adminController.updateStatus);
router.post("/updatePostStatus", checkAdminAuth, adminController.updatePostStatus);
router.post("/updateCommentStatus", checkAdminAuth, adminController.updateCommentStatus);


module.exports = router;
