'use strict';
const { Posts, Users, Comments, Likes } = require('../models');

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          as: 'user',
        },
        {
          model: Comments,
          as: 'comments',
        },
        {
          model: Likes,
          as: 'likes',
        },
      ],
    });
    res.status(200).json({ result: 200, data: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Posts.create(req.body);
    res.status(200).json({ result: 200, data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ result: 404, error: 'Post not found' });
    }
    await post.update(req.body);
    res.status(200).json({ result: 200, data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ result: 404, error: 'Post not found' });
    }
    await post.destroy();
    res.status(200).json({ result: 200, data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { user_id: req.params.uid },
      include: [
        {
          model: Users,
          as: 'user',
        },
        {
          model: Comments,
          as: 'comments',
        },
        {
          model: Likes,
          as: 'likes',
        },
      ],
    });
    res.status(200).json({ result: 200, data: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};
