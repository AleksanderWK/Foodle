const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ShoppingListSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  groceries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Grocery",
    },
  ],
});

module.exports = mongoose.model(
  "ShoppingList",
  ShoppingListSchema,
  "shoppinglists"
);
