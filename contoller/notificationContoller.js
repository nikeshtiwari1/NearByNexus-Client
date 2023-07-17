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

const getNotificationCount = async (req, res) => {
  if (req.session && req.session.userId != null) {
    const notifications = await notificationService.getNotificationsCount(
      req.session.token
    );
console.log("count fetched succesfully ",{ data : notifications});
res.json({ data: notifications })
  } else res.render("login.ejs");
};

module.exports = { notifications, getNotificationCount };
