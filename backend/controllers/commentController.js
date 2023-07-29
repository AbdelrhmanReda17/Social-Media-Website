const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

const CommentFail = (res, errormsg) => {
    res.status(400).json({ error: errormsg });
};

// Get  a Post Comments

const getComments = async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        await Comment.find({postId : req.params.id}).then((comments) => {
          res.status(200).json(comments);
        })
        .catch((error) => {
            CommentFail(res, "No Posts With this Id");
        });
    }else{
        CommentFail(res, "Invalid Comment ID");
    }
};

// Create a new Comment
const createComment = async (req, res) => {
    const { userId, postId , content } = req.body;
    try {
      const newPost = await Comment.create({ userId, postId , content });
      res.status(200).json(newPost);
    } catch (err) {
        CommentFail(res, err.message);
    }
};
  
// Delete a Comment
const deleteComment = async (req, res) => {
    const { userId, postId , content } = req.body;
    await Comment.findOneAndDelete({userId , postId , content})
    .then(() => {
        res.status(200).json({ mssg: "Comment deleted successfully" });
    })
    .catch(() => {
        CommentFail(res, "No Comment With this Id");
    });
};


module.exports = {
    getComments,
    createComment,
    deleteComment,
};
  