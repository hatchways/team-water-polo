const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.uploadImage = asyncHandler(async (req, res) => {
  res.send("Okay---okay")
});
