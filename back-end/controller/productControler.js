const { json } = require("body-parser");
const Product = require("../models/prodectModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { query } = require("express");

const allProduct = asyncHandler(async (req, res) => {
  try {
    // FILTER SECTION
    const qryitem = { ...req.query };
    const exclud = ["page", "sort", "limit", "fields"];
    exclud.forEach((el) => delete qryitem[el]);
    let qryString = JSON.stringify(qryitem);
    qryString = qryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let result = Product.find(JSON.parse(qryString)); // Do NOT await yet

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      result = result.sort(sortBy);
    } else {
      result = result.sort("-createdAt");
    }

    // LIMITING FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      result = result.select(fields);
    } else {
      result = result.select("-__v");
    }

    // PAGINATION
    const pageNo = req.query.page || 1;
    const limit = req.query.limit || 50;
    const skip = (pageNo - 1) * limit;
    result = result.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exist");
      }
    }

    // EXECUTE QUERY
    const finalResult = await result;
    res.json(finalResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// Add to wishList

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await User.findById(_id);
    const wishlisted = user.wishList.find((i) => i.toString() === productId);
    if (wishlisted) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: productId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: productId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (err) {
    throw new Error(err);
  }
});

const addreview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, review, productId } = req.body;
  try {
    const product = await Product.findById(productId);
    let alredyRated = product.ratings.find(
      (i) => i.postedBy.toString() === _id.title()
    );
    if (alredyRated) {
      let updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alredyRated },
        },
        {
          $set: { "rating.$.star": star, "rating.$.review": review },
        },
        {
          new: true,
        }
      );
      res.json(updateRating);
    } else {
      let rateProduct = await Product.findById(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              review: review,
              postedBy: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      const allRating = await Product.findById(productId);
      let totalrating = allRating.ratings.length;
      let ratingSum = allRating.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingSum / totalrating);
      let fProduct = await Product.findByIdAndUpdate(
        productId,
        {
          totalrating: actualRating,
        },
        {
          new: true,
        }
      );
      res.json(fProduct);
    }
  } catch (err) {
    throw new Error(err);
  }
});

// SELLER SIDEEE

const addProduct = asyncHandler(async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  allProduct,
  addProduct,
  findProduct,
  addToWishList,
  addreview,
};
