const express = require("express");
const ShoppingList = require("../models/ShoppingList");
const router = express.Router();

// get shoppinglist by user id
router.get("/:id", async (req, res) => {
  try {
    ShoppingList.findOne({ owner: req.params.id })
      .populate("groceries")
      .then((shl) => res.json(shl));
  } catch (error) {
    res.json({ message: error });
  }
});

// add a grocery to a shoppinglist
router.post("/add", async (req, res) => {
  try {
    await ShoppingList.findByIdAndUpdate(
      { _id: req.body.shoppinglistId },
      {
        $push: { groceries: req.body.groceryId },
      },
      {
        new: true,
      }
    )
      .populate("groceries")
      .then((shl) => {
        res.json(shl);
      });
  } catch (error) {
    res.json({ message: error });
  }
});

// delete a grocery from a shoppinglist

router.post("/delete", async (req, res) => {
  try {
    let shl = await ShoppingList.findById(req.body.shoppinglistId);
    let shl_groceries = shl.groceries;
    const index = shl_groceries.indexOf(req.body.groceryId);
    if (index > -1) {
      shl_groceries.splice(index, 1);
    }
    ShoppingList.findByIdAndUpdate(
      req.body.shoppinglistId,
      { groceries: shl_groceries },
      {
        new: true,
      }
    )
      .populate("groceries")
      .then((ushl) => res.json(ushl));
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
