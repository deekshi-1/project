const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const allCategory = asyncHandler(async (req, res) => {
  try {
    const result = await Category.find();
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Category.findById({ _id });
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = { allCategory,getCategory };
