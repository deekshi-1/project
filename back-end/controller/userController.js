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

//WISHLIST AND ADDRESS

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
});

const addAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const updateAddress = await User.findByIdAndUpdate(
      _id,
      {
        $push: { adre: prodId },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    throw new Error(err);
  }
});

//CART
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  try {
    let products = [];
    const user = await User.findById(_id);
    const cartExist = await Cart.findOne({ orderby: user._id });
    if (cartExist) {
      cartExist.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let obj = {};
      obj.product = cart[i]._id;
      obj.count = cart[i].count;
      obj.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("Price").exec();
      obj.price = getPrice;
      products.push(obj);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (err) {
    throw new Error(err);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (err) {
    throw new Error(err);
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (err) {
    throw new Error(err);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD } = req.body;
  try {
    if (!COD) throw new Error("Cash on delivery failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let total = userCart.total;
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: total,
        status: "Cash on delivery",
        created: Date.now(),
        currency: "inr",
      },
      orderby: user._id,
      orderStatus: "Cash On Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});

    res.json({ message: success });
  } catch (err) {
    throw new Error(err);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const userorder = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .exec();
    res.json(userorder);
  } catch (err) {
    throw new Error(err);
  }
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
  getWishList,
  addAddress,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getOrders,
};
