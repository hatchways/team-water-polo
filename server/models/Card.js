const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  tag: {
    type: String,
    required: true,
  },

  columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column'
    },
    
},
{
  timestamps: true
});

module.exports = Card = mongoose.model("Card", cardSchema);