const express = require("express");
const Goal = require("../models/Goal");
const router = express.Router();

// /goals

// add a goal for a user

router.post("/add", async (req, res) => {
  try {
    new Goal({
      owner: req.body.owner,
      calories: req.body.calories,
      protein: req.body.protein,
      fat: req.body.fat,
      carbohydrates: req.body.carbohydrates,
    })
      .save()
      .then((goal) => res.json(goal));
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
