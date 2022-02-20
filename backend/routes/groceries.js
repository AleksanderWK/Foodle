const express = require("express");
const Grocery = require("../models/Grocery");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const groceries = await Grocery.find().limit(2);
        res.json(groceries);
    } catch (error) {
        res.json({message: error})
    }
});

module.exports = router;