const Board = require("../models/Board");
const Column = require("../models/Column");
const asyncHandler = require("express-async-handler");


exports.createColumn = asyncHandler(async (req, res)=> {

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

exports.updateColumn = asyncHandler(async (req, res)=> {
  const {title} = req.body
  const column = await Column.findById(req.params.id)
  if (!column) {
    res.status(404);
    throw new Error("No Column found");
  }
  column.title = title;
  column.save()
  res.status(200).json(column)
})