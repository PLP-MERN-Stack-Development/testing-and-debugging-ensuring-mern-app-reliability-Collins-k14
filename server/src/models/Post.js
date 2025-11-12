const mongoose = require('mongoose');
const { post } = require('../app');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId },
  slug: { type: String, unique: true },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

