const express = require('express');
const router = express.Router();
const { validateCreateCard, validateCard } = require('../middleware/validate');
const protect = require('../middleware/auth');
const {
  createCard,
  updateCard,
  moveCard
} = require('../controllers/card');

router.route('/').post(protect, validateCard, createCard);
router.route('/:id/update').patch(protect, validateCard, updateCard);
router.route('/:id/move').patch(protect, moveCard);

module.exports = router;
