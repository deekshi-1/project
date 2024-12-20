const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);

// {
//   products: [
//     {
//       product: {
//         type: Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       count: Number,
//       color: String,
//       price: Number,
//     },
//   ],
//   cartTotal: Number,
//   total: Number,
//   orderby: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
// },
// { timestamps: true }
