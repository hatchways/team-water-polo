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

  columns :[
    {
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Column"
		}
  ],
});

boardSchema.pre("save", function(next){
  if(this.isNew){
    this.columns = []
    // what do i push here???
    this.columns.push()
  }
})

module.exports = Board = mongoose.model("Board", boardSchema);