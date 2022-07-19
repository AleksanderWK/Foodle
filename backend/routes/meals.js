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

module.exports = router;
