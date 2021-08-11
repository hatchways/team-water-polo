const express = require('express');
const router = express.Router();
const { validateCreate} = require('../middleware/validate');
const protect = require('../middleware/auth');
const {
  createColumn,
  updateColumn
} = require('../controllers/column');

router.route('/').post(protect, validateCreate, createColumn);
router.route('/:id').patch(protect, validateCreate, updateColumn);

module.exports = router;
