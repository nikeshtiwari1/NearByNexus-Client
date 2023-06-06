const homeService = require("../service/homeService.js");
const session = require("express-session");

const home = async (req, res) => {
  res.render("login.ejs");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginDetail = await homeService.login(email, password);
    console.log(loginDetail);
    req.session.userId = loginDetail.data.detail.user._id;
    req.session.token = loginDetail.data.detail.token;
    console.log("Stored token", req.session.userId);
    res.redirect('/events');
  } catch (error) {
    console.log("error on controller", token);
    res.render("login.ejs");
  }
};

const register = (req, res) => {
  console.log("Stored token", req.session.token);
  res.render("register.ejs");
};

const profile = (req, res) => {
  res.render("profile.ejs");
};

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, dateOfBirth } = req.body;
  try {
    const userDetails = await homeService.register(name, email, password, phoneNumber, dateOfBirth);
  
    res.render("profile.ejs", { userDetails });
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

module.exports = { home, register, login, registerUser,profile };
