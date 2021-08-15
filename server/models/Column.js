const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },

    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],

    cardOrder: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Column = mongoose.model("Column", columnSchema);
