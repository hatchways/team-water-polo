const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");

exports.createColumn = asyncHandler(async (req, res) => {
  const { boardId, title, side } = req.body;
  const board = await Board.findById(boardId);

  if (!board) {
    res.status(404);
    throw new Error("No Board found");
  }
  const newColumn = await Column.create({
    title,
    boardId: board._id,
  });
  board.columns.push(newColumn);

  if (side === "left") {
    board.columnOrder = [newColumn._id, ...board.columnOrder];
  } else {
    board.columnOrder = [...board.columnOrder, newColumn._id];
  }

  board.save();
  res.status(200).json(newColumn);
});

exports.updateColumn = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const column = await Column.findById(req.params.id);
  if (!column) {
    res.status(404);
    throw new Error("No Column found");
  }
  column.title = title;
  column.save();
  res.status(200).json(column);
});
