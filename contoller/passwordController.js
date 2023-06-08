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
    const {token} = req.query.token;
    console.log(token);

      res.render("changePassword.ejs",{token:token});
    };
  

module.exports = { forgetPassword,validateToken,changePassword };
