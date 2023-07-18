const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid');
const router = express.Router();
const storeController = require('../controllers/store.controller');
//handle multer store save
//1. create store to save data
/**
 * khi dùng thằng multer diskStorage cung cấp cho 1 người 1 object và trong đây mình sẽ có hai sự lựa chọn
 * 1. destination
 *   được dùng để xác định thư mục nào file được upload. Có thể là một string (cd: 'tmp/uploads'). Nếu không khai báo thì ngầm hiểu là lấy thư mục tạm thời của hệ điều hành đang sử dụng
 *   nếu khai báo nó dưới dạng 1 function, phải tự tạo đường dẫn
 *
 * 2. filename
 *  được dùng để xác định file nào sẽ được lưu trong thư mục. kiểu như là m sẽ phải định dạng cho file cho từng bức ảnh
 *  Nếu không khai báo nó sẽ nhận file ngẫu nhiên mà không bao gồm đuôi hay định dạng  tên file
 */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/');
  },
  filename: (req, file, callback) => {
    console.log('file', file);
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, uuidv4() + '-' + filename);
  },
});

//handle upload
const upload = multer({
  storage: storage,
  //fileFilter dùng để xử lý việc upload các file nào cho phép, file nào không được cho phép, là 1 function nhận vào req, file, cb
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg files are supported'));
    }
  },
});

//mình có thể cho nhiều dạng upload

/**
 * 1. upload.single allow upload only 1 picture
 * 2. upload.array("name", số lượng chăng chưa tìm hiểu được)
 *  để lấy ra nhiều thì phải dùng req.files là một mảng các file photos
 * 3. upload.files đầu vào của nó là 1 mảng các object
 *req.files là một object kiểu (String -> Array) mà fieldname là key, và value là mảng các files
  //
  // vd:
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body sẽ giữ thông tin gắn kèm (vd: text fields), nếu có
});
 */

router.post('/upload', upload.array('dataImage', 12), storeController.uploadStore);
router.get('/upload', storeController.getUpload);
module.exports = router;
