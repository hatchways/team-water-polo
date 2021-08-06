const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createBoard
} = require('../controllers/board');

// Have to use protect here, but protect seems buggy
// Can use more than one middleware???
router.route('/').post(createBoard);

module.exports = router;
