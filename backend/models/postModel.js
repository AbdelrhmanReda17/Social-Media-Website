const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
}, { timestamps: true });


const Post = mongoose.model('Posts', postSchema);
module.exports = Post;