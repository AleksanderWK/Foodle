const express = require("express");
const router = express.Router();
const FavoriteList = require("../models/FavoriteList");

// /favoritelists

// get favoriteslist for user
router.get("/:userid", async (req, res) => {
  try {
    FavoriteList.findOne({ owner: req.params.userid }).then((fl) =>
      res.json(fl)
    );
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// add item as favorite

router.post("/add", async (req, res) => {
  try {
    await FavoriteList.findByIdAndUpdate(
      { _id: req.body.favoritelistId },
      {
        $push: { groceries: req.body.groceryId, meals: req.body.mealId },
      },
      {
        new: true,
      }
    ).then((fl) => {
      res.json(fl);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// remove item as favorite

router.post("/delete", async (req, res) => {
  try {
    let fl = await FavoriteList.findById(req.body.favoritelistId);
    let fl_groceries = fl.groceries;
    let fl_meals = fl.meals;
    const grocery_index = fl_groceries.indexOf(req.body.groceryId);
    const meal_index = fl_meals.indexOf(req.body.mealId);
    if (grocery_index > -1) {
      fl_groceries.splice(grocery_index, 1);
    }
    if (meal_index > -1) {
      fl_meals.splice(meal_index, 1);
    }
    FavoriteList.findByIdAndUpdate(
      req.body.favoritelistId,
      {
        groceries: fl_groceries,
        meals: fl_meals,
      },
      {
        new: true,
      }
    ).then((ufl) => res.json(ufl));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
