const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friend.controller');

router.get('/', friendsController.getAllFriends);
router.get('/filter', friendsController.filterFriend);
router.get('/info', friendsController.getHeaderInfo);
router.get('/:id', friendsController.getFriendById);
router.post('/', friendsController.createNewFriend);
router.put('/:id', friendsController.editFriendData);

module.exports = router;
