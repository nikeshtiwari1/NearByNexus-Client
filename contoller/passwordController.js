const passwordService = require("../service/passwordService.js");

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await passwordService.forgetPassword(email);
    console.log(response);

    res.redirect("/event");
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

const validateToken = async (req, res) => {
  const token = req.query.token;
  try {
    console.log(token);

    const response = await passwordService.validateToken(token);

    res.redirect(`/change-password?token=${token}`);
  } catch (error) {
    console.log("error on controller");
    res.render("login.ejs");
  }
};
const changePassword = async (req, res) => {
  const { token } = req.query.token;
  console.log(token);

  res.render("reset_password.ejs", { token: token });
};
const confirmChangePassword = async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  if (password !== confirmPassword) {
    // Passwords don't match, render the same page with an error message
    return res.render("reset_password.ejs", {
      token: token,
      error: "Passwords do not match",
    });
  }
  try {
    const response = await passwordService.changePassword(
      password,
      confirmPassword,
      token
    );
    console.log(response);

    res.render("login.ejs",{
      message: response.data.message,
    });
  } catch (error) {
    console.log("error on controller", error);
    res.render("login.ejs");
  }
};

module.exports = {
  forgetPassword,
  validateToken,
  changePassword,
  confirmChangePassword,
};
