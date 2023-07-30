const postService = require("../service/postService.js");
const homeService = require("../service/homeService.js");
const event = async (req, res) => {
  if (req.session && req.session.userId != null && req.session.role == "User") {
    const profile = await homeService.getProfile(req.session.token);
    console.log(profile);
    res.render("event.ejs", { imageUrl: profile.data.imageUrl });
  } else res.render("login.ejs");
};

const getEventDetail = async (req, res) => {
  if (req.session && req.session.userId != null && req.session.role == "User")
    res.render("eventDetail.ejs", { postId: req.query.postId });
  else res.render("login.ejs");
};

const getNearByEvents = async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const posts = await postService.getAllPostByLocation(
    longitude,
    latitude,
    req.session.token
  );
  res.json({
    posts: posts.posts,
    currentUserImage: posts.currentUserImage,
    name: req.session.name,
    currentUserAddress: posts.currentUserAddress,
  });
};

const getPostDetail = async (req, res) => {
  const postId = req.query.postId;
  const posts = await postService.getPostDetail(postId, req.session.token);
  console.log("posts", posts);
  res.json({
    posts: posts.posts,
    currentUserImage: posts.currentUserImage,
    name: req.session.name,
    currentUserAddress: posts.currentUserAddress,
  });
};

const savePost = async (req, res) => {
  console.log("event", req.file);
  const {
    title,
    postDescription,
    latitude,
    longitude,
    startDate,
    endDate,
    postType,
  } = req.body;

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
      req.file,
      req.session.token
    );
    const posts = await postService.getAllPost(req.session.token);

    res.render("event.ejs", {
      message: "Post created succesfull!",
      posts: posts,
    });
  } catch (error) {
    const posts = await postService.getAllPost(req.session.token);
    console.log("error on controller", { error, posts: posts });
    res.render("event.ejs", {
      error: "Unable to create post, Please try again later.",
    });
  }
};

module.exports = {
  event,
  savePost,
  getNearByEvents,
  getPostDetail,
  getEventDetail,
};
