const express = require("express");
const router = express.Router();
const { validateTeam } = require("../middleware/validate");
const protect = require("../middleware/auth");
const {
  loadTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/team");

router.route("/:id").get(protect, loadTeam);
router.route("/").post(protect, validateTeam, createTeam);
router.route("/:id").patch(protect, updateTeam);
router.route("/:id").delete(protect, deleteTeam);

module.exports = router;
