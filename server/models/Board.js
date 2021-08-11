const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  ownerId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  columns :[
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ],
  
},
{
  timestamps: true
}
);

module.exports = Board = mongoose.model("Board", boardSchema);