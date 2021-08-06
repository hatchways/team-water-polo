const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");


exports.createColumn = asyncHandler(async (req, res, next)=> {

  const {boardId, title} = req.body
  const board = await Board.findById(boardId)
  if (!board) {
    res.status(404);
    throw new Error("No Board found");
  }
  const newColumn = await Column.create({
    title,
    boardId : board._id
  })
  board.columns.push(newColumn)
  board.save()
  res.status(200).json(board)

})
