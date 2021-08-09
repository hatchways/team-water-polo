const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// Create new board
exports.createBoard = asyncHandler(async (req, res, next)=> {
  
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (!req.body.title) {
    res.status(204);
    throw new Error("Need to provide a title");
  }
  
  const {title} = req.body
  const board = await Board.create({
    title,
    ownerId: user._id
  });
  const inProgressColumn = await Column.create({
    title : "In Progress",
    boardId : board._id
  })
  const completedColumn = await Column.create({
    title : "Completed",
    boardId : board._id
  })
  board.columns.push(inProgressColumn, completedColumn)
  board.save()

  res.status(200).json(board)

})

// get an existing board
exports.loadBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.id
  const board = await Board.findById(boardId).populate("columns")
  if (!board) {
    res.status(404);
    throw new Error("No Board found");
  }
  res.status(200).json(board)
})