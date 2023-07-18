const express = require('express');
const CommentController = require('../controllers/commentController');
const checkAuthentication = require('../middlewares/checkAuth');
const router = express.Router();

router.get('/get-like-love-comment', CommentController.handleAllLikeLoveComment);
router.get('/get-love-comment', CommentController.handleGetLoveComment);
router.get('/get-like-comment', CommentController.handleGetLikeComment);
router.delete('/delete-like-comment/:id', CommentController.DeleteLikeComment);
router.post('/add-like-comment', CommentController.handlelPostLikeComment);

router.get('/get-all-comment', CommentController.handleGetAllComment);
router.post('/add-comment', CommentController.handlelPostComment);

router.get('/', (req, res) => {
  res.json('Comments Ok');
});

module.exports = router;
