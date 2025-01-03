const User = require("../models/userModel");
const Product = require("../models/prodectModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/jwtRefresh");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendMail = require("./emailController");
const crypto = require("crypto");
const URL = process.env.BASE_URL || "http://localhost:3000";

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
    res.status(401).json({ message: "Invalid email" });
  } else {
    const check = await checkUser.passwordCheck(password);
    if (!check) {
      res.status(401).json({ message: "Invalid email or password" });
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
        _id: checkUser?._id,
        firstName: checkUser?.firstName,
        lastName: checkUser?.lastName,
        email: checkUser?.email,
        mobile: checkUser?.mobile,
        address: checkUser?.address,
        token: refreshToken,
      });
    }
  }
});

//update User
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      _id: updatedUser?._id,
      firstName: updatedUser?.firstName,
      lastName: updatedUser?.lastName,
      email: updatedUser?.email,
      mobile: updatedUser?.mobile,
      token: updatedUser?.refreshToken,
    });
  } catch (error) {
    throw new Error(error);
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
    const resetURL = `Please follow link to reset the Password <a href="${URL}/reset-password/${token}">Click here</a>`;
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

const addAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { newAddress } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    user.address.push(newAddress);
    await user.save();

    res.json("Address saved succesfully");
  } catch (error) {
    console.error("Error adding new address:", error.message);
    throw error;
  }
});

const getAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).select("address");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.address);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const editAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { addressId, updatedAddress } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.address[addressIndex] = {
      ...user.address[addressIndex],
      ...updatedAddress,
    };
    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      address: user.address[addressIndex],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
const deleteAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { itemId } = req.params;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === itemId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.address.splice(addressIndex, 1); // Remove the address
    await user.save();

    res.status(200).json({
      message: "Address deleted successfully",
      remainingAddresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//WISHLIST

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishList");
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
});

//CART
const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ userId: _id }).populate("productId");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const removeCartProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePrdQnty = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQnty } = req.params;
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = newQnty;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalPrice, paymentInfo } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      paymentInfo,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ user: _id }).populate(
      "orderItems.product"
    );
    res.json({
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  handleRefresh,
  updatePassword,
  forgotPassword,
  resetPassword,
  getWishList,
  addAddress,
  getAddress,
  deleteAddress,
  userCart,
  getUserCart,
  // emptyCart,
  createOrder,
  getMyOrders,
  removeCartProduct,
  updatePrdQnty,
};
