const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createBoard
} = require('../controllers/board');

router.route('/').post(createBoard);

module.exports = router;
