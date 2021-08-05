const User = require("../models/User");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");


exports.createBoard = asyncHandler(async (req, res, next)=> {
  const {title} = req.body
  console.log(title)
  res.send("Reached Here")
})
