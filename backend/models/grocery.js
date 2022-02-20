const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema({
    matvare: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Grocery", grocerySchema, "groceries");