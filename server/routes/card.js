const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createCard
} = require('../controllers/card');

router.route('/').post(protect, createCard);

module.exports = router;
