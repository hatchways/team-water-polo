const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// Create new board
exports.createBoard = asyncHandler(async (req, res, next) => {
  // for testing
  const userId = "6101722718952e53d0064181";
  const user = await User.findById(userId);
  // const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const { title } = req.body;
  const board = await Board.create({
    title,
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
  board.save();

  res.status(200).json(board);
});

// get an existing board
exports.loadBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.id;
  const data = await Board.findById(boardId).populate("columns");

  if (!data) {
    res.status(404);
    throw new Error("No Board found");
  }

  function mapToBoard(data) {
    const tasks = [];
    const columns = {};
    for (column of data.columns) {
      tasks.push(...column.cards);
      columns[column.id] = column;
    }

    return {
      tasks: tasks,
      columns: columns,
      columnOrder: data.columnOrder,
    };
  }

  const board = mapToBoard(data);

  res.status(200).json(board);
});

// update an existing board
exports.updateBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const board = await Board.findById(req.params.id);
  if (!board) {
    res.status(404);
    throw new Error("No Board found");
  }
  board.title = title;
  board.save();
  res.status(200).json(board);
});
