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

  in_progress: {
    type: Boolean,
    default: true
  },

  is_completed: {
    type: Boolean,
    default: false
  },
  
  owner : {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
  },

  columns : [
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ]
});

module.exports = Board = mongoose.model("Board", boardSchema);