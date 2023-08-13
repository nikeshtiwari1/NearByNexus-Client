const postService = require("../service/postService.js");
const homeService = require("../service/homeService.js");
const event = async (req, res) => {
  if (req.session && req.session.userId != null && req.session.role == "User") {
    const profile = await homeService.getProfile(req.session.token);
    if (profile) res.render("event.ejs", { imageUrl: profile.data.imageUrl });
    else res.render("login.ejs");
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
    locationName,
    startDate,
    endDate,
    postType,
  } = req.body;
  const profile = await homeService.getProfile(req.session.token);
  if (postDescription == null) {
    return res.render("event.ejs", {
      postDescription,
      error: "Please enter the description.",
      imageUrl: profile.data.imageUrl,
    });
  }

  try {
    const postDetail = await postService.savePost(
      title,
      postDescription,
      latitude,
      longitude,
      F=locationName,
      startDate,
      endDate,
      postType,
      req.file,
      req.session.token
    );
    // const posts = await postService.getAllPost(req.session.token);

    res.render("event.ejs", {
      message: "Post created succesfull!",
      imageUrl: profile.data.imageUrl,
    });
  } catch (error) {
    const posts = await postService.getAllPost(req.session.token);
    console.log("error on controller", { error, posts: posts });
    res.render("event.ejs", {
      error: "Unable to create post, Please try again later.",
      imageUrl: profile.data.imageUrl,
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
