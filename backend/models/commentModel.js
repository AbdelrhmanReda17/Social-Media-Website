const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, { timestamps: true });


const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;