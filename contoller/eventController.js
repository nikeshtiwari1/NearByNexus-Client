const postService = require("../service/postService.js");

const event = async (req, res) => {
  const posts = await postService.getAllPost(req.session.token);
  res.render("event.ejs",{posts:posts});
};

const getNearByEvents = async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const posts = await postService.getAllPostByLocation(longitude,latitude,req.session.token);
  res.json({ posts: posts });
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
    const posts = await postService.getAllPost(req.session.token,);

    res.render("event.ejs", {
      message: "Post created succesfull!",
      posts:posts
    });
  } catch (error) {
    const posts = await postService.getAllPost(req.session.token,);
    console.log("error on controller", {error,posts:posts});
    res.render("event.ejs",{error:"Unable to create post, Please try again later."});
  }
};

module.exports = { event, savePost, getNearByEvents };
