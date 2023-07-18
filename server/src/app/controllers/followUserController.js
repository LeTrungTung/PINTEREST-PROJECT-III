const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.config');
const bcrypt = require('bcryptjs');
const sql = require('../../libs/database/db');

class FollowUserController {
  // lấy API số lượt follow từ bảng users join với follows, images
  async handleGetFollowUser(req, res) {
    try {
      sql.query(
        `SELECT users.*, follows.*,images.userCreateId,images.idImage
        FROM users
        JOIN images ON images.userCreateId = users.idUser
        JOIN follows ON users.follow = follows.idFollow`,
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
  // lấy users được theo dõi
  async handleGetUserFollowed(req, res) {
    try {
      sql.query(
        `select * from follows join users on users.idUser=follows.userFollowedbyId where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling get followed:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get followed:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy users đang theo dõi người khác
  async handleGetUserFollowOther(req, res) {
    try {
      sql.query(
        `select * from  follows 
        join users on users.idUser=follows.userFollowOtherId
        where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling get followed:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get followed:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy xoá theo dõi người khác
  async handleDeleteFollowOther(req, res) {
    try {
      sql.query(
        `DELETE FROM follows
        where idFollow=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling delete followed:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ Msg: 'Xoá thành công' });
        }
      );
    } catch (error) {
      console.error('Error handling delete followed:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // add follow lưu vào bảng follows
  handlelPostFollowOther(req, res) {
    if (!req.body) return;
    const newFollow = {
      userFollowedbyId: req.body.userFollowedbyId,
      userFollowOtherId: req.body.userFollowOtherId,
    };
    const insertFollow = `INSERT INTO follows (userFollowedbyId,userFollowOtherId) VALUES (?, ?)`;
    sql.query(insertFollow, [newFollow.userFollowedbyId, newFollow.userFollowOtherId], (err, result) => {
      if (err) {
        console.log('loi roi');
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ msg: 'Thêm mới Follow thành công' });
    });
  }
}

module.exports = new FollowUserController();
