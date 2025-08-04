const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  user_id: { type: Number, required: true },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'post',
  },
  comment: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('comment', commentSchema);
