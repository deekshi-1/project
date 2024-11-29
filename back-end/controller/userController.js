const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    // email exist
    throw new Error("Email already linked with an account");
  } else {
    //new user creation
    const newUser =await User.create(req.body);
    res.status(201).json(newUser);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email: email });
  if (!checkUser) {
    throw new Error("Email Id doesn't exist");
  } else {
    const check = await checkUser.passwordCheck(password);
    if (!check) {
      throw new Error("Invalid password");
    } else {
      res.json({ 
        name:checkUser?.firstName,
        email:checkUser?.email,
        token: generateToken(checkUser?._id)});
    }
  }
});

module.exports = { createUser, loginUser };
