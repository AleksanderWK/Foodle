const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GoalSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: String,
    required: true,
  },
  fat: {
    type: String,
    required: true,
  },
  carbohydrates: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Goal", GoalSchema, "goals");
