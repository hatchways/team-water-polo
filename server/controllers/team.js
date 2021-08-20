const Team = require("../models/Team");
const Board = require("../models/Board");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const checkIfExists = require("../utils/checkIfExists");

// @desc get Team
// @access Private
exports.loadTeam = asyncHandler(async (req, res) => {
  const teamId = req.params.id;
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const team = await Team.findById(teamId)
    .populate({ path: "boards", populate: { path: "columns" } })
    .populate("collaborators");

  if (!team) {
    res.status(404);
    throw new Error("No Team found");
  }

  res.status(200).json(team);
});

// @desc create Team
// @access Private
exports.createTeam = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const { title, boards, collaborators } = req.body;
  let allBoards = boards || [];
  let allCollaborators = collaborators || [];

  // if array of boards is provided, check if all the board exists
  if (boards && boards.length) {
    await checkIfExists(boards, Board, res, "Board");
    allBoards = [...boards];
  }

  if (collaborators && collaborators.length) {
    await checkIfExists(collaborators, User, res, "User");
    allCollaborators = [...collaborators];
  }

  const team = await Team.create({
    title,
    ownerId: user._id,
    boards: allBoards,
    collaborators: allCollaborators,
  });
  res.status(200).json(team);
});

// @desc create Team
// @access owner
exports.updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(404);
    throw new Error("No Team found");
  }
  const { title, boards, collaborators } = req.body;

  if (title) {
    team.title = title;
  }

  if (boards && boards.length) {
    await checkIfExists(boards, Board, res, "Board");
    team.boards = [...boards];
  }

  if (collaborators && collaborators.length) {
    await checkIfExists(collaborators, User, res, "User");
    team.collaborators = [...collaborators];
  }
  team.save();
  res.status(200).json(team);
});

// @desc create Team
// @access owner
exports.deleteTeam = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(404);
    throw new Error("No Team found");
  }

  if (JSON.stringify(team.ownerId) !== JSON.stringify(user._id)) {
    res.status(403);
    throw new Error("You dont have permission to do this!");
  }
  await Team.findByIdAndDelete(team._id);
  res.status(204);
});
