const express = require("express");
const { allCategory,getCategory } = require("../controller/categoryController");
const router = express.Router();

router.get("/all", allCategory);
router.get("/:id", getCategory);


module.exports = router;
