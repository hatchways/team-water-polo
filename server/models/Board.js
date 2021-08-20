const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true.valueOf,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],

    columnOrder: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Board = mongoose.model("Board", boardSchema);
