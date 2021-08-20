const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const asyncHandler = require("express-async-handler");
const mapToBoard = require("../utils/mapToBoard");

// Create new board
exports.createBoard = asyncHandler(async (req, res, next) => {
  const { title, userId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const board = await Board.create({
    title: title,
    ownerId: user._id,
  });

  const inProgressColumn = await Column.create({
    title: "In Progress",
    boardId: board._id,
  });
  const completedColumn = await Column.create({
    title: "Completed",
    boardId: board._id,
  });

  board.columns.push(inProgressColumn, completedColumn);
  board.columnOrder = board.columns.map((column) => column.id);
  user.boards.push(board);
  board.save();
  user.save();

  res.status(200).json(mapToBoard(board));
});

// get an existing board
// this might not be needed since all boards are loaded at login
exports.loadBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.id;
  const data = await Board.findById(boardId).populate("columns");

  if (!data) {
    res.status(404);
    throw new Error("No Board found");
  }

  res.status(200).json(board);
});

// update an existing board
exports.updateBoard = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error("No Board found");
  }

  switch (type) {
    case "COLUMN":
      board.columnOrder = req.body.columnOrder;
      break;
    case "TITLE":
      board.title = req.body.title;
      break;
    default:
      break;
  }

  board.save();
  res.status(204);
});
