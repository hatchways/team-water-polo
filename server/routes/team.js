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

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/:id").get(protect, loadTeam);
router
  .route("/")
  .post(protect, upload.array("images", 12), validateTeam, createTeam);
router.route("/:id").patch(protect, upload.array("images", 12), updateTeam);
router.route("/:id").delete(protect, deleteTeam);

module.exports = router;
