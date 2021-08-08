const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { uploadImage } = require("../controllers/image");

router.route("/").post(uploadImage);

module.exports = router;
