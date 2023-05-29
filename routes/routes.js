const express = require("express");

const {home} = require("../contoller/homecontoller.js");
const router = express.Router();
router.get("/",home);

module.exports = router;