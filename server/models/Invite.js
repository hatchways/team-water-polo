const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  senderId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: {
      unique: true,
      partialFilterExpression: {userId:
        {$type: mongoose.Schema.Types.ObjectId}
      }
    }
  },
  email: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: {email: {$type: "string"}}
    }
  },
  board : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
},
{
  timestamps: true
}
);

inviteSchema.pre('validate', async function(next) {
  // ensures one field exists but not both
  return (!this.email !== !this.userId)
  ? next()
  : next(new Error('No user ID or email address provided'));
});

module.exports = Invite = mongoose.model("Invite", inviteSchema);