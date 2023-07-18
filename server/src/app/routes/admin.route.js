const express = require('express');
// const UserController = require('../controllers/userController');
// const AdminController=require('../controllers/admin.controller')
const checkAuthentication = require('../middlewares/checkAuth');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

router.post('/login', adminController.loginAdmin);

module.exports = router;
