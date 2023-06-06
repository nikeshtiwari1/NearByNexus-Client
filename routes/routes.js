const express = require("express");

const {home, register,login} = require("../contoller/homecontoller.js");
const router = express.Router();
router.get("/",home);
router.get("/login",home);
router.post("/login",login);

router.get("/register",register);
module.exports = router;