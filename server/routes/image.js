const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadImage, getImage } = require("../controllers/image");

router.route("/:key").get(getImage)
router.route("/").post(upload.single('image'), uploadImage);

module.exports = router;
