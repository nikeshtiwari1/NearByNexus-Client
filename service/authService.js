const checkAuth = (req, res, next) => {
  console.log("auth check");
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

const checkAdminAuth = (req, res, next) => {
  console.log("auth check");
  if (req.session.userId && req.session.role == 'Admin') {
    next();
  } else {
    res.redirect("/login");
  }
};
module.exports = { checkAuth, checkAdminAuth };
