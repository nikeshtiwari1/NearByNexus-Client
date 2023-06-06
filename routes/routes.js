const express = require("express");

const {home, register,login,registerUser,profile} = require("../contoller/homecontoller.js");
const eventController = require('../contoller/eventController.js')
const router = express.Router();
router.get("/",home);
router.get("/login",home);
router.post("/login",login);

router.get("/register",register);
router.post("/register",registerUser);

router.get("/profile",profile);

router.get("/events",eventController.event);


module.exports = router;