const express = require("express");
const Grocery = require("../models/Grocery");
const router = express.Router();
const FavoriteList = require("../models/FavoriteList");
const ShoppingList = require("../models/ShoppingList");

// /groceries

router.get("/", async (req, res) => {
  try {
    const groceries = await Grocery.find().limit(2);
    res.json(groceries);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/search", async (req, res) => {
  try {
    const queryWords = req.body.query.split(" ");
    const queries = [];
    const filters = new Set(req.body.filters);
    const user_id = req.body.user_id;
    queryWords.forEach((word) => {
      const lowerCaseWord = word.toLowerCase();
      const formattedWord =
        lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
      queries.push({
        Matvare: {
          $regex: String(formattedWord),
        },
      });
    });
    const fl = await FavoriteList.findOne({ owner: user_id });
    const shl = await ShoppingList.findOne({ owner: user_id });
    let matchedGroceries = await Grocery.find({ $and: queries }).then(
      (matchedGroceries) => {
        let filtered = matchedGroceries;
        if (filters.has("favorite")) {
          filtered = filtered.filter((grocery) =>
            fl.groceries.includes(grocery._id)
          );
        }
        if (filters.has("shoppinglist")) {
          filtered = filtered.filter((grocery) =>
            shl.groceries.includes(grocery._id)
          );
        }
        return filtered;
      }
    );
    res.json(matchedGroceries);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
