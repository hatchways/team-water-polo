const Invite = require("../models/Invite");
const User = require("../models/User");
const Team = require("../models/Team");
const asyncHandler = require("express-async-handler");
const sendEmailInvitation = require("../utils/sendEmailInvitation");

exports.createInvitation = asyncHandler(async (req, res)=> {
  const { senderId, recepientId, email, teamId } = req.body

  const team = await Team.findById(teamId)
  const sender = await User.findById(senderId)

  if (!team || !sender) {
    res.status(404);
    throw new Error("Team and/or user could not be found");
  }

  if (email) {
      sendEmailInvitation(email, sender.username, team.name);
      const invite = await Invite.create({
          sender,
          email,
          team
      });
      invite.save();
      res.status(200).json(invite);
  } else if (recepientId) {
    const invite = await Invite.create({
        sender,
        userId: recepientId,
        team
    });
    invite.save();
    res.status(200).json(invite);
  } else {
    res.status(404);
    throw new Error("Failed to send invitation");
  }
})

exports.getInvitations = asyncHandler(async (req, res)=> {
  const { userId } = req.body;
  const invites = await Invite.find({ userId: userId });
  if (invites) {
    res.status(200).json(invites);
  } else {
    res.status(404);
    throw new Error("No invitations were found");
  }
})

exports.deleteInvitation = asyncHandler(async (req, res)=> {
  const {inviteId} = req.body
  const deleted = await Invite.deleteOne({ _id: inviteId });
  if (!deleted) {
    res.status(404);
    throw new Error("Unable to delete invite");
  } else {
    res.status(204);
  }
})