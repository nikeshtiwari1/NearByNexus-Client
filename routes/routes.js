const express = require("express");
const { checkAuth } = require("../service/authService.js");
const {
  home,
  register,
  login,
  registerUser,
  profile,
  logout,
  updateProfile,
  updateToken
} = require("../contoller/homecontoller.js");

const eventController = require("../contoller/eventController.js");
const passwordController = require("../contoller/passwordController.js");
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
router.post("/profile",checkAuth, updateProfile);

router.post("/saveToken",checkAuth, updateToken);

router.get("/logout", logout);
router.get("/event", checkAuth, eventController.event);

router.post("/savePost",checkAuth, eventController.savePost);

module.exports = router;
