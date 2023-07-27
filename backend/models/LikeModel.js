const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
}, { timestamps: true });


const Post = mongoose.model('likes', likeSchema);
module.exports = Post;