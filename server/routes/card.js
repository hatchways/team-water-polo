const express = require("express");
const router = express.Router();
const { validateCard, validateUpdateCard } = require("../middleware/validate");
const protect = require("../middleware/auth");
const {
  loadCard,
  createCard,
  updateCard,
  moveCard,
} = require("../controllers/card");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/:id").get(loadCard);
router
  .route("/")
  .post(protect, upload.array("images", 12), validateCard, createCard);
router
  .route("/:id/update")
  .patch(protect, upload.array("images", 12), validateUpdateCard, updateCard);
router.route("/:id/move").patch(protect, moveCard);

module.exports = router;
