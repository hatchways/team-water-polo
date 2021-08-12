const User = require("../models/User");
// const Board = require("../models/Board");
// const Column = require("../models/Column");
// const Card = require("../models/Card");
const { uploadFile, getFileStream, deleteFile} = require('../s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  const emailExists = await User.findOne({ email });
  
  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }
  
  const usernameExists = await User.findOne({ username });
  
  if (usernameExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)

  const user = await User.create({
    username,
    email,
    password,
    avatar: result.key
  });
  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

// @desc Update user Profile
// @access Private
exports.updateUser =  asyncHandler(async (req, res)=> {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const file = req.file
  if(file) {
    await deleteFile(user.avatar)
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    user.avatar = result.key;
  }
  const { username, email, password } = req.body;
  user.username = username;
  user.email = email
  user.password = password
  user.save()

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    }
  });
})