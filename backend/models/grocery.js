const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema({
    Matvare: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Grocery", grocerySchema, "groceries");