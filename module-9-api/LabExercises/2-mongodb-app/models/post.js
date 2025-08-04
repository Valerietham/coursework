const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  user_id: { type: Number, required: true },
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  header_image_url: { type: String, trim: true, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  is_published: { type: Boolean, required: true },
});

module.exports = mongoose.model('post', postSchema); // lowercase singular schema name
