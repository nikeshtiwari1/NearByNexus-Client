const event = async (req, res) => {
  console.log("Stored id", req.session.userId);

    res.render("event.ejs");
  };

  module.exports = {event};