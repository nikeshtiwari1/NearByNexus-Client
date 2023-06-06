const express = require("express");

const {home, register,login,registerUser,profile} = require("../contoller/homecontoller.js");
const router = express.Router();
router.get("/",home);
router.get("/login",home);
router.post("/login",login);

router.get("/register",register);
router.post("/register",registerUser);

router.get("/profile",profile);

module.exports = router;