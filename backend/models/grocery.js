const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema({
  Matvare: {
    type: String,
    required: true,
  },
  Vann: String,
  Kilojoule: String,
  Kilokalorier: String,
  Fett: String,
  Mettet: String,
  Trans: String,
  Enumettet: String,
  Flerumettet: String,
  "Omega-3": String,
  "Omega-6": String,
  Kolesterol: String,
  Karbohydrat: String,
  Stivelse: String,
  "Tilsatt sukker": String,
  Kostfiber: String,
  Protein: String,
  Salt: String,
  Alkohol: String,
  "Vitamin A": String,
  Retinol: String,
  "Beta-karoten": String,
  "Vitamin D": String,
  "Vitamin E": String,
  Tiamin: String,
  Riboflavin: String,
  Niacin: String,
  "Vitamin B6": String,
  Folat: String,
  "Vitamin B12": String,
  "Vitamin C": String,
  Kalsium: String,
  Jern: String,
  Natrium: String,
  Kalium: String,
  Magnesium: String,
  Sink: String,
  Selen: String,
  Kopper: String,
  Fosfor: String,
  Jod: String,
});

module.exports = mongoose.model("Grocery", grocerySchema, "groceries");
