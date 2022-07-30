const express = require("express");
const Meal = require("../models/Meal");
const router = express.Router();

// get meals by user id
router.get("/:id", async (req, res) => {
  try {
    Meal.find({ owner: req.params.id })
      .populate("groceries")
      .then((shl) => res.json(shl));
  } catch (error) {
    res.json({ message: error });
  }
});

// create meal
router.post("/create", async (req, res) => {
  try {
    const newMeal = new Meal({
      owner: req.body.owner,
      mealName: req.body.mealName,
      groceries: req.body.groceryIds,
    });
    newMeal
      .save()
      .populate("groceries")
      .then((meal) => res.json(meal));
  } catch (error) {
    res.json({ message: error });
  }
});

// returns all meals by all users
router.post("/search", async (req, res) => {
  try {
    const queryWords = req.body.query.split(" ");
    const queries = [];
    queryWords.forEach((word) => {
      const lowerCaseWord = word.toLowerCase();
      const formattedWord =
        lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
      queries.push({
        mealName: {
          $regex: String(formattedWord),
        },
      });
    });
    const matchedMeals = await Meal.find({ $and: queries });
    res.json(matchedMeals);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
