const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const asyncHandler = require("express-async-handler");

exports.createCard = asyncHandler(async (req, res, next) => {
  const { columnId, boardId, content, tag } = req.body;

  const column = await Column.findOne({ _id: columnId, boardId: boardId });
  if (!column) {
    res.status(404);
    throw new Error("No Column found");
  }
  const newCard = await Card.create({
    content,
    tag,
    columnId: column._id,
  });
  column.cards.push(newCard);
  column.cardOrder.push(newCard._id);
  column.save();
  res.status(200).json(newCard);
});

// Update Card title or tag
exports.updateCard = asyncHandler(async (req, res) => {
  const { title, tag } = req.body;
  const card = await Card.findById(req.params.id);
  card.title = title;
  card.tag = tag;
  card.save();
  res.status(200).json(card);
});

// Move Card between columns
exports.moveCard = asyncHandler(async (req, res) => {
  const {
    sourceId: currentColumnId,
    destinationId: newColumnId,
    sourceIndex,
    destinationIndex,
  } = req.body;
  const card = await Card.findById(req.params.id);
  const currentColumn = await Column.findById(currentColumnId);

  currentColumn.cardOrder.splice(sourceIndex, 1);
  // if the card moved within the same column, change card's index within the array
  if (currentColumnId === newColumnId) {
    currentColumn.cardOrder.splice(destinationIndex, 0, card._id);
    currentColumn.save();
  } else {
    currentColumn.cards.map((c, index) => {
      if (c._id === card._id) {
        currentColumn.cards.splice(index, 1);
      }
    });
    currentColumn.save();

    card.columnId = newColumnId;
    card.save();

    const newColumn = await Column.findById(newColumnId);
    newColumn.cards.push(card);
    newColumn.cardOrder.splice(destinationIndex, 0, card._id);
    newColumn.save();
  }
  res.status(204);
});
