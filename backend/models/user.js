const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ShoppingList = require("./ShoppingList");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoppinglist: {
    type: Schema.Types.ObjectId,
    ref: "ShoppingList",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema, "users");
