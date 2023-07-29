const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");

const mongoose = require("mongoose");

const PostFail = (res, errormsg) => {
  res.status(400).json({ error: errormsg });
};

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Get user posts
const getPost = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await Post.find({userId : req.params.id})
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch(() => {
        PostFail(res, "No post with for this user");
      });
  } else {
    PostFail(res, "Invalid ID");
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { userId, username, content } = req.body;
  try {
    const NewPost = await Post.create({ userId, username, content });
    res.status(200).json({ NewPost });
  } catch (err) {
    PostFail(res, err.message);
  }
};

// Delete a post
const deletePost = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      
      if (!deletedPost) {
        return PostFail(res, "No post with this ID");
      }

      await Promise.all([
        Comment.deleteMany({ postId: req.params.id }),
        Like.deleteMany({ postId: req.params.id })
      ]);

      res.status(200).json({ mssg: "Post, likes, and comments deleted successfully" });
    } catch (error) {
      console.error(error);
      PostFail(res, "Error deleting post, likes, and comments");
    }
  } else {
    PostFail(res, "Invalid ID");
  }
};


// Update a post
const updatePost = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await Post.findByIdAndUpdate(req.params.id, { ...req.body })
      .then(() => {
        res.status(200).json({ mssg: "Post updated successfully" });
      })
      .catch(() => {
        PostFail(res, "No post with this ID");
      });
  } else {
    PostFail(res, "Invalid ID");
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
