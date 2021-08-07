const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createColumn,
  updateColumn
} = require('../controllers/column');

router.route('/').post(protect, createColumn);
router.route('/:id').patch(protect, updateColumn);

module.exports = router;
