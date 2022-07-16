const express = require("express");
const Grocery = require("../models/Grocery");
const router = express.Router();

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
    console.log(queries);
    const matchedGroceries = await Grocery.find({ $and: queries });
    res.json(matchedGroceries);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
