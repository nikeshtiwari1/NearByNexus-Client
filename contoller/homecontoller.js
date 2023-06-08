const homeService = require("../service/homeService.js");
const session = require("express-session");

const home = async (req, res) => {
  console.log(req.session.userId);
  if (req.session && req.session.userId != null) res.redirect("/event");
  else res.render("login.ejs");
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/login'); 
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginDetail = await homeService.login(email, password);
    console.log(loginDetail.data.detail);
    const session = req.session;

    session.userId = loginDetail.data.detail.user.id;
    session.token = loginDetail.data.detail.token;
    console.log("Stored id", req.session.userId);
    res.redirect("/event");
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs",{error:'Username or password not valid!'});
  }
};

const register = (req, res) => {
  if (req.session && req.session.userId != null) res.redirect("/event");
  else res.render("register.ejs");
};

const profile = async (req, res) => {
  console.log("profile");

  const profile = await homeService.getProfile(req.session.token);

  res.render("profile.ejs", { profile: profile.data });
};

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, dateOfBirth } = req.body;
  try {
    const userDetails = await homeService.register(
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth
    );

    res.render("profile.ejs", { userDetails });
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

module.exports = { home, register, login, registerUser, profile,logout };
