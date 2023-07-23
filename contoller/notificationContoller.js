const notificationService = require("../service/notificationService.js");

const notifications = async (req, res) => {
  if (req.session && req.session.userId != null) {
    const notifications = await notificationService.getAllNotifications(
      req.session.token
    );
    await notificationService.setNotificationViewed(
      req.session.token
    );
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

const notificationsViewed = async (req, res) => {
  if (req.session && req.session.userId != null) {
    const notifications = await notificationService.setNotificationViewed(
      req.session.token
    );
console.log("count fetched succesfully ",{ data : notifications});
res.json({ data: notifications })
  } else res.render("login.ejs");
};

module.exports = { notifications, getNotificationCount,notificationsViewed };
