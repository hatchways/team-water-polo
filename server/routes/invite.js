const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createInvitation,
  getInvitations,
  deleteInvitation
} = require('../controllers/invite');

router.route('/').get(protect, getInvitations);
router.route('/').post(protect, createInvitation);
router.route('/:id').delete(protect, deleteInvitation);

module.exports = router;
