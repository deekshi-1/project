const express = require("express");
const {
  allProduct,
  addProduct,
  findProduct,
  addToWishList,addreview
} = require("../controller/productControler");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/all", allProduct);
router.get("/:id", findProduct);
router.post("/add", addProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/review", authMiddleware, addreview);

module.exports = router;
