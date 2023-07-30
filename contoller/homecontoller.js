const homeService = require("../service/homeService.js");
const session = require("express-session");

const home = async (req, res) => {
  console.log(req.session.userId);
  if (req.session && req.session.userId != null && req.session.role == "User")
    res.redirect("/event");
  else if (
    req.session &&
    req.session.userId != null &&
    req.session.role == "Admin"
  )
    res.redirect("/admin");
  else res.render("login.ejs");
};

const logout = async (req, res) => {
  await homeService.logout(req.session.token);
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/login");
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
    session.name = loginDetail.data.detail.user.name;
    session.role = loginDetail.data.detail.user.role;
    if (loginDetail.data.detail.user.role == "User")
      res.redirect("/event");
    else if (
      loginDetail.data.detail.user.role == "Admin"
    )
      res.redirect("/admin");
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs", { error: "Username or password not valid!" });
  }
};

const register = (req, res) => {
  if (req.session && req.session.userId != null) res.redirect("/event");
  else res.render("register.ejs");
};

const profile = async (req, res) => {
  const successMessage = req.query.message;

  const profile = await homeService.getProfile(req.session.token);

  res.render("profile.ejs", { profile: profile.data, message: successMessage });
};

const getImages = async (req, res) => {
  const profile = await homeService.getProfile(req.session.token);

  res.render("profile.ejs", { profile: profile.data, message: successMessage });
};

const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, dateOfBirth, confirmPassword } =
    req.body;
  if (password !== confirmPassword) {
    // Passwords don't match, render the same page with an error message
    return res.render("register.ejs", {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      error: "Passwords do not match",
    });
  }
  const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/);
  const valid = regex.test(password);
  console.log(valid);
  if (!regex.test(password)) {
    return res.render("register.ejs", {
      error: "Passwords is not valid",
      name,
      email,
      phoneNumber,
      dateOfBirth,
    });
  }

  try {
    const userDetails = await homeService.register(
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth
    );

    res.render("login.ejs", {
      message: "Registration succesfull!",
    });
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

const updateProfile = async (req, res) => {
  const { name, phoneNumber, dateOfBirth, address } = req.body;
  try {
    const userDetails = await homeService.updateProfile(
      name,
      phoneNumber,
      dateOfBirth,
      address,
      req.session.token
    );

    res.redirect("/profile?message=Profile succcesfully updated!");
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const userDetails = await homeService.uploadProfileImage(
      req.file,
      req.session.token
    );

    res.json({ userDetails });
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

const updateToken = async (req, res) => {
  const { token } = req.body;
  console.log("request to update device token", req.body);
  try {
    const userDetails = await homeService.updateToken(token, req.session.token);

    return userDetails;
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

module.exports = {
  home,
  register,
  login,
  registerUser,
  profile,
  logout,
  updateProfile,
  updateToken,
  uploadProfileImage,
  getImages,
};
