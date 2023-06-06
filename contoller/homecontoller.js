const homeService = require("../service/homeService.js");
const session = require('express-session');

const home = async (req, res) => {
  res.render("login.ejs");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginDetail = await homeService.login(email, password);
    console.log(loginDetail);
    req.session.userId =  loginDetail.data.detail.user._id;
    req.session.token = loginDetail.data.detail.token;
    console.log("Stored token",req.session.userId)
    res.render("dashboard.ejs", { loginDetail });
  } catch (error) {
    console.log("error on controller", token);
    res.render("login.ejs");
  }
};

const register = (req, res) => {
  console.log("Stored token",req.session.toekn)
  res.render("register.ejs");
};

module.exports = { home, register, login };
