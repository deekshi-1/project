const express = require("express");
const {
  allProduct,
  addProduct,
  findProduct,
} = require("../controller/productControler");
const router = express.Router();

router.get("/", allProduct);
router.get("/:id", findProduct);
router.post("/add", addProduct);

module.exports = router;
