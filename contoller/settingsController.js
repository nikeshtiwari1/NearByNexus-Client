const notificationService = require("../service/settingsService.js");

const settings = async (req, res) => {
    const successMessage = req.query.message;
    const settings = await notificationService.getSettings(req.session.token);
    console.log("settings ", settings);

    res.render("settings.ejs",  settings );
  };
  

const updateSettings = async (req, res) => {
  if (req.session && req.session.userId != null) {
   const{isPushEnabled} = req.body;
   const data = await notificationService.updateSettings(
    isPushEnabled,
      req.session.token
    );
    res.json({ data});
} else res.render("login.ejs");
};

module.exports = {updateSettings, settings}