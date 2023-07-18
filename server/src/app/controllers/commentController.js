const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.config');
const bcrypt = require('bcryptjs');
const sql = require('../../libs/database/db');
const moment = require('moment');

class CommentController {
  // lấy API số lượt thả "TIM" từ bảng like_love_comment join với comments, users
  async handleGetLoveComment(req, res) {
    try {
      sql.query(
        `select * from like_love_comment 
      join comments on comments.idComment=like_love_comment.commentLikeLoveId 
      join users on users.idUser=like_love_comment.userLoveCommentId`,
        (err, results) => {
          if (err) {
            console.error('Error handling get users:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get comments:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API số lượt thả "LIKE" từ bảng like_love_comment join với comments, users
  async handleGetLikeComment(req, res) {
    try {
      sql.query(
        `select * from like_love_comment 
      join comments on comments.idComment=like_love_comment.commentLikeLoveId 
      join users on users.idUser=like_love_comment.userLikeCommentId`,
        (err, results) => {
          if (err) {
            console.error('Error handling get comments:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get users:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API comments join với cá bảng khác users
  async handleGetAllComment(req, res) {
    try {
      sql.query(
        `select * from comments 
        join images on images.idImage=comments.idComment 
        join like_love_comment on like_love_comment.commentLikeLoveId=comments.idComment
        join users on users.idUser=like_love_comment.userLikeCommentId or users.idUser=like_love_comment.userLoveCommentId`,
        (err, results) => {
          if (err) {
            console.error('Error handling get comments:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get users:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  handlelPostComment(req, res) {
    if (!req.body) return;
    const newComment = {
      imageCommentId: req.body.imageCommentId,
      userCommentId: req.body.userCommentId,
      content: req.body.content,
      // timecreate: moment(req.body.timecreate, 'YYYY-MM-DD').toDate(), // Parse date using format,
      timecreate: req.body.timecreate,
    };
    console.log('newComment', newComment);
    const insertComment = `INSERT INTO comments(imageCommentId,userCommentId,content,timecreate) VALUES (?, ?, ?,?)`;
    sql.query(
      insertComment,
      [newComment.imageCommentId, newComment.userCommentId, newComment.content, newComment.timecreate],
      (err, result) => {
        if (err) {
          console.log('loi roi');
          res.status(500).json({ msg: 'Loi server' });
          return;
        }
        res.status(200).json({ msg: 'Thêm mới Comment thành công' });
      }
    );
  }

  // lấy API TỪ bảng like_love_comment
  async handleAllLikeLoveComment(req, res) {
    try {
      sql.query(`select * from like_love_comment`, (err, results) => {
        if (err) {
          console.error('Error handling get like love comments:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(200).json({ data: results });
      });
    } catch (error) {
      console.error('Error handling get lke love users:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  DeleteLikeComment(req, res) {
    const id = req.params.id;
    const deleteImage = `DELETE FROM like_love_comment WHERE idLikeLoveComment = ?;`;
    sql.query(deleteImage, [id], (err, result) => {
      if (err) {
        console.log('loi roi');
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ message: 'Like comment deleted successfully' });
    });
  }

  handlelPostLikeComment(req, res) {
    if (!req.body) return;
    const newLikeComment = {
      commentLikeLoveId: req.body.commentLikeLoveId,
      userLikeCommentId: req.body.userLikeCommentId,
      userLoveCommentId: req.body.userLoveCommentId,
    };
    // console.log('newComment', newComment);
    const insertLikeComment = `INSERT INTO like_love_comment (commentLikeLoveId,userLikeCommentId,userLoveCommentId) VALUES (?, ?, ?)`;
    sql.query(
      insertLikeComment,
      [newLikeComment.commentLikeLoveId, newLikeComment.userLikeCommentId, newLikeComment.userLoveCommentId],
      (err, result) => {
        if (err) {
          console.log('loi roi');
          res.status(500).json({ msg: 'Loi server' });
          return;
        }
        res.status(200).json({ msg: 'Thêm mới Like comment thành công' });
      }
    );
  }
}

module.exports = new CommentController();
