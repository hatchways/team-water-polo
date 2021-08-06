const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");


exports.createBoard = asyncHandler(async (req, res, next)=> {
  // how do I send user info using postman??
  // const user = await User.findById(req.user.id);
  // Hardcoded for now
  const user = await User.findById('61088708ad994b1b30b54140');
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const {title} = req.body
  const board = await Board.create({
    title,
    ownerId: user._id
  });
  
  res.status(200).json(board)

})
