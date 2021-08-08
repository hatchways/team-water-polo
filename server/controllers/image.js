const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream} = require('../s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.getImage = asyncHandler(async (req, res)=> {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

exports.uploadImage = asyncHandler(async (req, res) => {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  res.send({imagePath: `/images/${result.Key}`})
});
