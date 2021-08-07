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
