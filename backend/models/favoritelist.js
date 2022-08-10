const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const FavoriteListSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  groceries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Grocery",
    },
  ],
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

module.exports = mongoose.model(
  "FavoriteList",
  FavoriteListSchema,
  "favoritelists"
);
