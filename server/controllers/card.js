const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const asyncHandler = require("express-async-handler");


exports.createCard = asyncHandler(async (req, res, next)=> {

  const {columnId, boardId, name, tag} = req.body
  const column = await Column.findOne({_id: columnId, boardId: boardId})
  if (!column) {
    res.status(404);
    throw new Error("No Column found");
  }
  const newCard = await Card.create({
    name,
    tag,
    columnId: column._id
  })
  column.cards.push(newCard)
  column.save()
  res.status(200).json(newCard)
})

// Update Card title or tag
exports.updateCard = asyncHandler(async (req, res)=> {
  const {name, tag} = req.body
  const card = await Card.findById(req.params.id)
  card.name = name
  card.tag  = tag
  card.save()
  res.status(200).json(card)
})

// Move Card between columns
exports.moveCard = asyncHandler(async (req, res)=> {
  const {currentColumnId, newColumnId} = req.body
  const card = await Card.findById(req.params.id)
  card.columnId = newColumnId
  card.save()

  // updating columns
  const currentColumn = await Column.findById(currentColumnId)
  currentColumn.cards.pull(req.params.id)
  currentColumn.save()
  const newColumn = await Column.findById(newColumnId)
  newColumn.cards.push(req.params.id)
  newColumn.save()
  res.status(200).json(card)
})