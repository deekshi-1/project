const express = require("express");
const { allBrand,getBrand } = require("../controller/brandController");
const router = express.Router();

router.get("/all", allBrand);
router.get("/:id", getBrand);


module.exports = router;
