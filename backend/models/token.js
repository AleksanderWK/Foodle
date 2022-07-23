const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TokenSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", TokenSchema, "tokens");
