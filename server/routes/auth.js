const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../middleware/validate');
const protect = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
  updateUser
} = require('../controllers/auth');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route('/register').post(upload.single('image'), validateRegister, registerUser);

router.route('/login').post(validateLogin, loginUser);

router.route('/user').get(protect, loadUser);

router.route('/logout').get(logoutUser);
router.route('/update').patch(protect, upload.single('image'), validateRegister, updateUser);

module.exports = router;
