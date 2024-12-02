const express = require("express");
const router = express.Router();
const {
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
  getOrders,updateOrderStatus,
} = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/refresh", handleRefresh);
router.get("/logout", logoutUser);
router.put("/changePassword", authMiddleware, updatePassword);

router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/get-orders", authMiddleware, getOrders);

router.post("/cart/cash-order", authMiddleware, createOrder);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/addAddress", authMiddleware, addAddress);
module.exports = router;
