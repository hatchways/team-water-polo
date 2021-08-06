const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createBoard,
  loadBoard
} = require('../controllers/board');

// Have to use protect here, but protect seems buggy
router.route('/:id').get(loadBoard);
router.route('/').post(createBoard);

module.exports = router;
