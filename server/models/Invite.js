const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: {email: {$type: "string"}}
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
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
},
{
  timestamps: true
}
);

inviteSchema.pre('validate', async function(next) {
  // ensures one field exists but not both
  return (!this.email !== !this.user)
  ? next()
  : next(new Error('No user ID or email address provided'));
});

module.exports = Invite = mongoose.model("Invite", inviteSchema);