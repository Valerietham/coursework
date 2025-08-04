const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: Number, autoIncrement: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});
module.exports = mongoose.model('user', userSchema);
