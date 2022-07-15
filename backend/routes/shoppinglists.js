const express = require("express");
const ShoppingList = require("../models/ShoppingList");
const router = express.Router();

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
    ).then((shl) => {
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
    const updated_shl = await ShoppingList.findByIdAndUpdate(
      req.body.shoppinglistId,
      { groceries: shl_groceries },
      {
        new: true,
      }
    );
    res.json(updated_shl);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
