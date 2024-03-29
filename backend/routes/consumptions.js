const express = require("express");
const isAuthenticated = require("../middleware/auth");
const Consumption = require("../models/Consumption");
const router = express.Router();

// /consumptions

// post a consumption for a user

router.post("/add", isAuthenticated, async (req, res) => {
  try {
    const newConsumption = new Consumption({
      owner: req.body.owner,
      name: req.body.name,
      consumptionDate: req.body.consumptionDate,
      groceries: req.body.groceries,
      meals: req.body.meals,
    });
    await newConsumption.save();
    const currentDate = new Date();
    const thirtyDaysAgo = new Date().setDate(currentDate.getDate() - 30);
    Consumption.find({
      owner: req.body.owner,
      currentDate: { $gte: thirtyDaysAgo },
    })
      .populate("groceries")
      .populate({
        path: "meals",
        populate: {
          path: "groceries",
          model: "Grocery",
        },
      })
      .then((consumptions) => res.json(consumptions));
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// get a users monthly consumptions

router.get("/:userId/lastthirty", isAuthenticated, async (req, res) => {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date().setDate(currentDate.getDate() - 30);
    Consumption.find({
      owner: req.params.userId,
      currentDate: { $gte: thirtyDaysAgo },
    })
      .populate("groceries")
      .populate({
        path: "meals",
        populate: {
          path: "groceries",
          model: "Grocery",
        },
      })
      .then((consumptions) => res.json(consumptions));
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// delete a consumption for a user

// edit a consumption for a users

module.exports = router;
