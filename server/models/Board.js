const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },

  inProgress: {
    type: Boolean,
    default: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  },
  
  userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required : true
  },

  columns : [
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ]
});

module.exports = Board = mongoose.model("Board", boardSchema);