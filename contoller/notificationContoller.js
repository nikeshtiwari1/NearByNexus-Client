const notificationService = require("../service/notificationService.js");

const notifications = async (req, res) => {
  if (req.session && req.session.userId != null) {
    const notifications = await notificationService.getAllNotifications(
      req.session.token
    );
console.log("noti ",{ data : notifications});
    res.render("notification.ejs", { data : notifications});
  } else res.render("login.ejs");
};

module.exports = { notifications };
