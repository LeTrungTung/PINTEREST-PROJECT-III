const express = require('express');
const FollowUserController = require('../controllers/followUserController');
const router = express.Router();

router.get('/get-follow-user', FollowUserController.handleGetFollowUser);
router.get('/get-userbyid-followed/:id', FollowUserController.handleGetUserFollowed);
router.get('/get-userbyid-follow-other/:id', FollowUserController.handleGetUserFollowOther);
router.delete('/delete-follow-byid/:id', FollowUserController.handleDeleteFollowOther);
router.post('/add-follow-other', FollowUserController.handlelPostFollowOther);

router.get('/', (req, res) => {
  res.json('Follows Ok');
});

module.exports = router;
