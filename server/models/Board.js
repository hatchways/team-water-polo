const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  
  owner : {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    required: true
  },

  columns : [
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ]
});

module.exports = Board = mongoose.model("board", boardSchema);