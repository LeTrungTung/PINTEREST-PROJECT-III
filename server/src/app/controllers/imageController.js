const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.config');
const bcrypt = require('bcryptjs');
const sql = require('../../libs/database/db');

class ImageController {
  // lấy API bảng images
  handleGetAllImage(req, res) {
    // Execute the query to get all users
    sql.query(`SELECT * FROM images`, (err, results) => {
      if (err) {
        console.error('Error handling get images:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      console.log('data', results);
      res.status(200).json({ data: results });
    });
  }

  // lấy images theo Id
  handleGetImageById(req, res) {
    sql.query(`SELECT * FROM images where idImage=${req.params.id}`, (err, results) => {
      if (err) {
        console.error('Error handling get images:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      console.log('data', results);
      res.status(200).json({ data: results });
    });
  }

  // lấy API bảng images JOIN bảng comment VÀ users
  async handleGetAllImageComment(req, res) {
    try {
      // Execute the query to get all users
      sql.query(
        'SELECT * FROM images JOIN comments ON images.idImage=comments.imageCommentId JOIN users ON users.idUser=comments.userCommentId',
        (err, results) => {
          if (err) {
            console.error('Error handling get users:', err);
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

  // lấy API bảng images JOIN bảng operation_image VÀ users
  async handleGetLoveImage(req, res) {
    try {
      // Execute the query to get all users
      sql.query(
        `select * from operation_image
        join images on images.idImage=operation_image.imageOperationId
        join users on operation_image.userLoveImageId=users.idUser`,
        (err, results) => {
          if (err) {
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

  async handleGetLikeImage(req, res) {
    try {
      sql.query(
        `select * from operation_image
        join images on images.idImage=operation_image.imageOperationId
        join users on operation_image.userLikeImageId=users.idUser`,
        (err, results) => {
          if (err) {
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API bảng users JOIN bảng images
  async handleGetImageCreatedByUserid(req, res) {
    try {
      sql.query(
        `select * from users join images on images.userCreateId=users.idUser where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling get users-image:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get users-image:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API bảng users JOIN bảng images
  async handleGetUserCreatedImagebyId(req, res) {
    try {
      sql.query(
        `SELECT * FROM users 
          JOIN images ON images.userCreateId=users.idUser
          where images.idImage=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling get users-image:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get users-create-image:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API bảng users JOIN bảng images, images_saved_user
  async handleGetImageSavedByUserid(req, res) {
    try {
      sql.query(
        `select * from users 
        join images_saved_user on images_saved_user.userSavedId=users.idUser
        join images on images.idImage=images_saved_user.imageSavedId
        where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error('Error handling get users-image-save:', err);
            return res.status(500).json({ msg: 'Server error' });
          }

          res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error('Error handling get users-image-save:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // lấy API bảng images_saved_user
  async handleGetImageSaved(req, res) {
    try {
      sql.query(`select * from images_saved_user`, (err, results) => {
        if (err) {
          console.error('Error handling get image-save:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(200).json({ data: results });
      });
    } catch (error) {
      console.error('Error handling get image-save:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // add ảnh lưu vào bảng images_saved_user
  handlelPostImageOnDocument(req, res) {
    if (!req.body) return;
    const newImage = {
      imageSavedId: req.body.imageSavedId,
      userSavedId: req.body.userSavedId,
    };
    const insertImage = `INSERT INTO images_saved_user(imageSavedId,userSavedId) VALUES (?, ?)`;
    sql.query(insertImage, [newImage.imageSavedId, newImage.userSavedId], (err, result) => {
      if (err) {
        console.log('loi roi');
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ msg: 'Thêm mới Comment thành công' });
    });
  }

  DeleteImageAtDocument(req, res) {
    const id = req.params.id;
    const deleteImage = `DELETE FROM images_saved_user WHERE idSaveImage = ?;`;
    sql.query(deleteImage, [id], (err, result) => {
      if (err) {
        console.log('loi roi');
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    });
  }

  // lấy API bảng operation_image
  async handleGetOperationImage(req, res) {
    try {
      sql.query(`select * from operation_image`, (err, results) => {
        if (err) {
          console.error('Error handling get operation_image:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(200).json({ data: results });
      });
    } catch (error) {
      console.error('Error handling get operation_image:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  DeleteLikeImage(req, res) {
    const id = req.params.id;
    const deleteLoveImage = `DELETE FROM operation_image WHERE idOperationImage = ?`;
    sql.query(deleteLoveImage, [id], (err, result) => {
      if (err) {
        console.log('loi roi');
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ message: 'Love Image deleted successfully' });
    });
  }

  handlelPostLoveImage(req, res) {
    if (!req.body) return;
    const newImage = {
      imageOperationId: req.body.imageOperationId,
      userLikeImageId: req.body.userLikeImageId,
      userLoveImageId: req.body.userLoveImageId,
      userSavedImageId: req.body.userSavedImageId,
    };
    const insertLoveImage = `INSERT INTO operation_image (imageOperationId,userLikeImageId,userLoveImageId,userSavedImageId) VALUES (?, ?, ?, ?)`;
    sql.query(
      insertLoveImage,
      [newImage.imageOperationId, newImage.userLikeImageId, newImage.userLoveImageId, newImage.userSavedImageId],
      (err, result) => {
        if (err) {
          console.log('loi roi');
          res.status(500).json({ msg: 'Loi server' });
          return;
        }
        res.status(200).json({ msg: 'Thêm mới love/like Image thành công' });
      }
    );
  }
}

module.exports = new ImageController();
