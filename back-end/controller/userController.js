const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/jwtRefresh");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendMail = require("./emailController");
const crypto = require("crypto");

// NEW USER
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    // email exist
    throw new Error("Email already linked with an account");
  } else {
    //new user creation
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  }
});

//LOGIN
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
      const refreshToken = await generateRefreshToken(checkUser._id);
      await User.findByIdAndUpdate(
        checkUser._id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        name: checkUser?.firstName,
        email: checkUser?.email,
        token: generateToken(checkUser?._id),
      });
    }
  }
});

//LOGOUT

const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const user = User.findOne({ refreshToken: refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return response.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

//  DELETE USER

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.user);

  try {
    const deleteUser = await User.findById(id);
    res.json({ deleteUser });
  } catch (err) {
    throw new Error(err);
  }
});

// Refresh token

const handleRefresh = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refreesh Token ");
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Cant find the user Token");
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err || user._id !== decode._id) {
      throw new Error("Somthing wrong with refresh token");
    }
    const accessToken = generateToken(user._id);
  });
});

//PASSWORD RESET

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  const userItem = await User.findById(_id);
  if (password) {
    userItem.password = password;
    const update = await userItem.save();
    res.json(update);
  } else {
    res.json(userItem);
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found ");
  }
  try {
    const token = await user.passwordResetToken();
    await user.save();
    const resetURL = `Please follow link to reset the Password <a href="https://localhost:3001/api/users/reset-password/${token}">Click here</a>`;
    const data = {
      to: email,
      text: "Hello user ",
      subject: "Reset Password",
      html: resetURL,
    };
    sendMail(data);
    res.json(token);
  } catch (err) {
    throw new Error(err);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetToken: hashToken,
    resetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired");
  }
  user.password = password;
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();
  res.json(user);  
});

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {});

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  logoutUser,
  handleRefresh,
  updatePassword,
  forgotPassword,
  resetPassword,
};
