const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            "Not Processed","Processing","Dispatched","Cancelled","Delivered"
        ],
    },
    orderby:{
        type: Schema.Types.ObjectId,
          ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
