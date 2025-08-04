const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// Toggle like (like/unlike a post)
router.post('/toggle', likeController.toggleLike);

// Get all likes for a post
router.get('/post/:post_id', likeController.getLikesByPost);

// Get all posts liked by a user
router.get('/user/:user_id', likeController.getLikesByUser);

module.exports = router;
