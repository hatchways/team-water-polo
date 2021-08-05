const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },

  column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column'
    }
});

module.exports = Card = mongoose.model("Card", cardSchema);