const postService = require("../service/postService.js");

const event = async (req, res) => {
  console.log("Stored id", req.session.userId);

  res.render("event.ejs");
};

const savePost = async (req, res) => {
  const {
    title,
    postDescription,
    latitude,
    longitude,
    startDate,
    endDate,
    postType,
  } = req.body;
  
  console.log(postDescription);
  if (postDescription == null) {
    // Passwords don't match, render the same page with an error message
    return res.render("event.ejs", {
      postDescription,
      error: "Please enter the description.",
    });
  }

  try {
    const postDetail = await postService.savePost(
      title,
      postDescription,
      latitude,
      longitude,
      startDate,
      endDate,
      postType,
      req.session.token
    );

    res.render("event.ejs", {
      message: "Post created succesfull!",
    });
  } catch (error) {
    console.log("error on controller", error);
    res.render("event.ejs",{error:"Unable to create post, Please try again later."});
  }
};

module.exports = { event, savePost };
