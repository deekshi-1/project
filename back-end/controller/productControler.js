const { json } = require("body-parser");
const Product = require("../models/prodectModel");
const asyncHandler = require("express-async-handler");
const slugyfy = require("slugify");
const { query } = require("express");

const allProduct = asyncHandler(async (req, res) => {
  try {
    //FILTER SECTION

    const qryitem = { ...req.query };
    const exclud = ["page", "sort", "limit", "fields"];
    exclud.forEach((el) => delete qryitem[el]);
    let qryString = json.slugyfy(qryitem);
    qryString = qryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let result = await Product.find(JSON.parse(qryString));

    // SORTING

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      result = result.sort(sortBy);
    } else {
      result = result.sort("-createdAt");
    }

    // Limiting Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      result = result.select(fields);
    } else {
      result = result.select("-__v");
    }

    //PAGINTION

    const pageNo = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page doesnot exist");
      }
    }
    const finalResult = await result;
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

const findProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findById(id);
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
});

// SELLER SIDEEE

const addProduct = asyncHandler(async (req, res) => {
  try {
    req.body.slug = slugyfy(req.body.title);
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndUpdate({ id }, req.body, { new: true });
});

module.exports = { allProduct, addProduct, findProduct };
