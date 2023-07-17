
const commentService = require('../service/commentsService.js');

const postComment = async (req, res) => {
    const { postId, comment } = req.body;
    try {
      const response = await commentService.postComment(
        postId,
        comment,
        req.session.token
      );
  
      res.json({ data: response })

    } catch (error) {
      console.log("error on controller", error);
      res.render("event.ejs");
    }
  };

  module.exports = {postComment}