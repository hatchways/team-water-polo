const express = require("express");
const router = express.Router();
const { validateCreate } = require("../middleware/validate");
const protect = require("../middleware/auth");
const { createBoard, loadBoard, updateBoard } = require("../controllers/board");

router.route("/:id").get(loadBoard); // add protect back in
router.route("/").post(validateCreate, createBoard); // add protect back in
router.route("/:id").patch(protect, validateCreate, updateBoard);

module.exports = router;
