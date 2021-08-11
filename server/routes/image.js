const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadImage, uploadImages, getImage } = require("../controllers/image");

router.route("/:key").get(getImage)
router.route("/").post(upload.single('image'), uploadImage);
router.route("/bulk").post(upload.array('images', 12), uploadImages);

module.exports = router;
