const express = require("express");

const {home, register,login,registerUser,profile} = require("../contoller/homecontoller.js");
const eventController = require('../contoller/eventController.js');
const passwordController = require('../contoller/passwordController.js');
const router = express.Router();
router.get("/",home);
router.get("/login",home);
router.post("/login",login);

router.post("/forget-password",passwordController.forgetPassword);
router.get("/password-reset/request",passwordController.validateToken);
router.get('/change-password' , passwordController.changePassword);
router.post('/change-password' , passwordController.confirmChangePassword);

router.get("/register",register);
router.post("/register",registerUser);

router.get("/profile",profile);

router.get("/event",eventController.event);


module.exports = router;