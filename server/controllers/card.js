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
  const {currentColumnId, newColumnId, sourceIndex, destinationIndex} = req.body

  const card = await Card.findById(req.params.id)
  const currentColumn = await Column.findById(currentColumnId)
  // if the card moved within the same column, change card's index within the array
  if(currentColumnId === newColumnId) {
    currentColumn.cards.splice(sourceIndex, 1)
    currentColumn.cards.splice(destinationIndex, 0, card._id)
    card.save()
  }

  // if the card moved tod a different column, first update card's column, remove it from current column, 
  // add it in the new column

  if(currentColumnId !== newColumnId) {
    card.columnId = newColumnId
    card.save()
    currentColumn.cards.splice(sourceIndex, 1)
    currentColumn.save()
    const newColumn = await Column.findById(newColumnId)
    newColumn.cards.splice(destinationIndex, 0, card._id)
    newColumn.save()
    
  }
  res.status(200).json(card)
})