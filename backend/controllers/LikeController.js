const Like = require("../models/LikeModel");
const mongoose = require("mongoose");

const LikeFail = (res, errormsg) => {
    res.status(400).json({ error: errormsg });
};


// Get all posts
const getLikes = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      await Like.find({postId : req.params.id}).then((likes) => {
        res.status(200).json(likes);
      })
      .catch(() => {
        LikeFail(res, "No Like With this Id");
      });
  }else{
    LikeFail(res, "Invalid Like ID");
  }

};

// Create a new Like
const createLike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      return res.status(409).json({ error: 'Like already exists.' });
    }
    const newPost = await Like.create({ userId, postId });
    res.status(200).json({ newPost });
  } catch (err) {
    LikeFail(res, err.message);
  }
};

// Delete a Like
const deleteLike = async (req, res) => {
    const { userId, postId } = req.body;
    await Like.findOneAndDelete({userId , postId})
      .then(() => {
          res.status(200).json({ mssg: "Like deleted successfully" });
      })
      .catch(() => {
          LikeFail(res, "No Like With this Id");
      });
};

module.exports = {
    getLikes,
    createLike,
    deleteLike,
};
  