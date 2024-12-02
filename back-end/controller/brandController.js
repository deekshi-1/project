const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");

const allBrand = asyncHandler(async (req, res) => {
  try {
    const result = await Brand.find();
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Brand.findById({ _id });
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = { allBrand, getBrand };
