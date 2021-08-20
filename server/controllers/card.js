const Card = require("../models/Card");
const Column = require("../models/Column");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require("../s3");
const deleteImagesInS3 = require("../utils/deleteImagesInS3");
const asyncHandler = require("express-async-handler");

exports.createCard = asyncHandler(async (req, res, next) => {
  const { columnId, boardId, title, tag } = req.body;

  const column = await Column.findOne({ _id: columnId, boardId: boardId });

  if (!column) {
    res.status(404);
    throw new Error("No Column found");
  }
  const files = req.files;
  let images = [];
  if (files.length) {
    images = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        return result.key;
      })
    );
  }
  const newCard = await Card.create({
    title,
    tag,
    columnId: column._id,
    images: [...images],
  });

  column.cards.push(newCard);
  column.cardOrder.push(newCard._id);
  column.save();
  res.status(200).json(newCard);
});

exports.updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    res.status(404);
    throw new Error("No Card found");
  }

  const { currentImages, title, tag } = req.body;
  // currentImages is an array containing the keys of current images in the card
  // update the images in db based on the current images in the card
  if (card.images.length && currentImages.length) {
    await deleteImagesInS3(card.images, currentImages);
  }

  const files = req.files;
  let images = [];
  // if user additionally upload new image, save them as well
  if (files.length) {
    images = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        return result.key;
      })
    );
  }

  card.title = title;
  card.tag = tag;
  card.images = [...currentImages, ...images];
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
