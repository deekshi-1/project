const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: { type: String, enum: ["Samsung", "Apple", "LG"] },
    color: { type: String, enum: ["Black", "Red", "Blue"] },
    quantity: Number,
    sold: {
      type: Number,
      defaultL: 0,
    },
    images: {
      type: Array,
    },
    ratings: [
      {
        star: Number,
        review: String,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
