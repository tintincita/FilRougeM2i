const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
      trim: true,
      // minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
      // minLength: 3,
      maxLength: 50,
    },
    userName: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
      // minLength: 5,
      maxLength: 55,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      // validate: [isEmail],
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      // minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
