const express = require("express");
const router = express.Router();
const { validateCreate } = require("../middleware/validate");
const protect = require("../middleware/auth");
const { createBoard, loadBoard, updateBoard } = require("../controllers/board");

router.route("/:id").get(protect, loadBoard);
router.route("/").post(protect, validateCreate, createBoard);
router.route("/:id").patch(protect, updateBoard);

module.exports = router;
