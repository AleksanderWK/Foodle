const express = require("express");
const ShoppingList = require("../models/ShoppingList");
const router = express.Router();
const nodemailer = require("nodemailer");

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

// Send shoppinglist to a user´s email

router.post("/send", async (req, res) => {
  try {
    const serviceEmailAddress = "foodle.web.noreply@gmail.com";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: serviceEmailAddress,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const content = await ShoppingList.findOne({ owner: req.body._id })
      .populate("groceries")
      .populate("owner");
    const username = content.owner.username;
    let groceryList = `<ul>
      ${content.groceries.map((grocery) => `<li>${grocery.Matvare}</li>`)}
    </ul>`;

    const mailOptions = {
      from: serviceEmailAddress,
      to: req.body.email,
      subject: "Din Foodle handleliste!",
      html: `<p>Hei ${username}! Her er handlelisten din: </p> \n ${groceryList.replaceAll(
        ",",
        ""
      )}`,
    };
    transporter.sendMail(mailOptions);
    res.json({ message: "mail sent!", successful: true });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
