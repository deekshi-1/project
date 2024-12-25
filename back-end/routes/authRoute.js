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
  removeCartProduct,
  addAddress,
  userCart,
  getUserCart,
  createOrder,
  getMyOrders,
  updatePrdQnty,
  updateUser,
} = require("../controller/userController");




const authMiddleware = require("../middleware/auth");
const { checkout, paymentVerification } = require("../controller/paymentController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/update-user", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/logout", logoutUser);
router.put("/changePassword", authMiddleware, updatePassword);
router.get("/refresh", handleRefresh);

router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.post("/cart/create-order", authMiddleware, createOrder);


router.get("/wishlist", authMiddleware, getWishList);
router.post("/addAddress", authMiddleware, addAddress);
router.delete(
  "/remove-cart-item/:cartItemId",
  authMiddleware,
  removeCartProduct
);
router.delete(
  "/update-cart-item/:cartItemId/:newQnty",
  authMiddleware,
  updatePrdQnty
);


router.post('/order/checkout', authMiddleware, checkout)
router.post("/order/paymentVerification",authMiddleware,paymentVerification)
router.get("/myorders", authMiddleware, getMyOrders);


module.exports = router;
