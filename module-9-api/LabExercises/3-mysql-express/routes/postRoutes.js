let express = require('express');
let router = express.Router();
const postController = require('../controllers/postController');

router.get('/', (req, res) => {
  postController.getPosts(req, res);
});

router.post('/create', (req, res) => {
  postController.createPost(req, res);
});

router.put('/:id', (req, res) => {
  postController.updatePost(req, res);
});

router.delete('/:id', (req, res) => {
  postController.deletePost(req, res);
});

router.get('/user/:uid', (req, res) => {
  postController.getUserPosts(req, res);
});

module.exports = router;
