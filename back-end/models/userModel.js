  const mongoose = require("mongoose");
  const bcrypt = require("bcrypt");
  const crypto = require("crypto");
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      mobile: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
      cart: {
        type: Array,
        default: [],
      },
      address:[
        {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          country: { type: String, required: true },
          pincode: { type: String, required: true },
        },
      ],,
      wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      refreshToken: {
        type: String,
      },
      passwordChange: Date,
      resetToken: String,
      resetExpires: Date,
    },
    {
      timestamps: true,
    }
  );

  UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  });

  UserSchema.methods.passwordCheck = async function (input) {
    return await bcrypt.compare(input, this.password);
  };

  UserSchema.methods.passwordResetToken = async function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetExpires = Date.now() + 10 * 60 * 100;
    return token;
  };

  module.exports = mongoose.model("User", UserSchema);
