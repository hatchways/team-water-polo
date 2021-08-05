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
  
  ownerId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  columns :{
    type:  [
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ],
  default : ["In Progress", "Completed"]
}
});

module.exports = Board = mongoose.model("Board", boardSchema);