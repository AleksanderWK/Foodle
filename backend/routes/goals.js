const express = require("express");
const Goal = require("../models/Goal");
const router = express.Router();

// /goals

// add a goal for a user

router.post("/add", async (req, res) => {
  try {
    const goal = new Goal({
      owner: req.body.owner,
      calories: req.body.calories,
      protein: req.body.protein,
      fat: req.body.fat,
      carbohydrates: req.body.carbohydrates,
    });
    let newGoal = goal.toObject();
    delete newGoal._id;
    Goal.findOneAndUpdate({ owner: goal.owner }, newGoal, {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true,
    }).then((goal) => res.json(goal));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// get a users goal

router.get("/:userid", async (req, res) => {
  try {
    Goal.findOne({ owner: req.params.userid }).then((goal) => {
      res.json(goal);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
