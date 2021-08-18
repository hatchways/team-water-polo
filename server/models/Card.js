const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    tag: {
      type: String,
      default: "white",
    },
    deadline: {
      type: Date,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },

    images: [],
  },
  {
    timestamps: true,
  }
);

module.exports = Card = mongoose.model("Card", cardSchema);
