const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MealSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  mealName: {
    type: String,
    required: true,
  },
  groceries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Grocery",
    },
  ],
});

module.exports = mongoose.model("Meal", MealSchema, "meals");
