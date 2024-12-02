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
} = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/refresh", handleRefresh);
router.get("/logout", logoutUser);
router.put("/changePassword", authMiddleware, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
