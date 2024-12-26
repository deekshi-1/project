const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    short_description: {
      type: String,
      required: true,
      trim: true,
      default: "brandname,quantiy",
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type:String
    },
    brand: { type: String},
    color: { type: Array },
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
