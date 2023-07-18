const likeService = require('../service/likeService.js');

const likePost = async (req, res) => {
    const { postId } = req.body;
    try {
      const response = await likeService.postLike(
        postId,
        req.session.token
      );
  
      res.json({ data: response })

    } catch (error) {
      console.log("error on controller", error);
      res.render("event.ejs");
    }
  };

  module.exports = {likePost}