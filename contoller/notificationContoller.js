const notifications = async (req, res) => {
    console.log(req.session.userId);
    if (req.session && req.session.userId != null) res.render("notification.ejs");
    else res.render("login.ejs");
  };

  module.exports = {notifications}