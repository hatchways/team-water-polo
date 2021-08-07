const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createCard,
  updateCard,
  moveCard
} = require('../controllers/card');

router.route('/').post(protect, createCard);
router.route('/:id/update').patch(protect, updateCard);
router.route('/:id/move').patch(protect, moveCard);

module.exports = router;
