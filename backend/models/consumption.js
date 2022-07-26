const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ConsumptionSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  consumptionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Consumption",
  ConsumptionSchema,
  "consumptions"
);
