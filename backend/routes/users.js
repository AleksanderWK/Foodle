const express = require("express");
const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");
const router = express.Router();

// /users

router.get("/:id", async (req, res) => {
  try {
    User.findById(req.params.id).then((user) => res.json(user));
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  // retrieve data from request and make object
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // save object in db and respond
  try {
    // save user
    let savedUser = await user.save();

    // create and save shoppinglist
    const shoppinglist = new ShoppingList({
      owner: savedUser._id,
    });
    const savedshl = await shoppinglist.save();

    // update saved user with shoppinglist id and save again
    savedUser.shoppinglist = savedshl._id;
    savedUser = await savedUser.save();

    res.json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    User.findOne({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => res.json(user));
  } catch (error) {
    res.json(error);
  }
});

router.get("/:username/shoppinglist", async (req, res) => {
  User.find({ username: req.params.username })
    .populate("shoppinglist")
    .then((user) => res.json(user));
});

module.exports = router;
