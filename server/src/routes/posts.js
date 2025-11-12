// src/routes/posts.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

// Create a post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const post = await Post.create({
      title,
      content,
      category: category ? new mongoose.Types.ObjectId(category) : undefined,
      author: req.user._id,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts (with optional category filter & pagination)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category: new mongoose.Types.ObjectId(category) } : {};
    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    res.json(post);
  } catch (err) {
    res.sendStatus(404);
  }
});

// Update post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    if (!post.author.equals(req.user._id)) return res.sendStatus(403);

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    if (!post.author.equals(req.user._id)) return res.sendStatus(403);

    await post.remove();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
