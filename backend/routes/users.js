const express = require("express");
const User = require("../models/User");
const router = express.Router();

//Register a user
router.post("/register", async (req, res) => {
  // retrieve data from request and make object
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // save object in db and respond
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

//login a user
router.post("/login", async (req, res) => {
  User.findOne(
    {
      username: req.body.username,
      password: req.body.password,
    },
    (error, user) => {
      if (error) {
        res.json(error);
      } else {
        res.json(user);
      }
    }
  );
});

module.exports = router;
