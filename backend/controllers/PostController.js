const Post = require("../models/postModel");
const mongoose = require("mongoose");

const PostFail = (res, errormsg) => {
  res.status(400).json({ error: errormsg });
};

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Get a single post
const getPost = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await Post.findById(req.params.id)
      .then((workout) => {
        res.status(200).json(workout);
      })
      .catch(() => {
        PostFail(res, "No post with this ID");
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
    await Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ mssg: "Post deleted successfully" });
      })
      .catch(() => {
        PostFail(res, "No post with this ID");
      });
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
