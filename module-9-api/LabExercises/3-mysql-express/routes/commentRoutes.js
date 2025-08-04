const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/create', commentController.createComment);

router.get('/post/:post_id', commentController.getCommentsByPost);

router.put('/:comment_id', commentController.updateComment);

router.delete('/:comment_id', commentController.deleteComment);

module.exports = router;
