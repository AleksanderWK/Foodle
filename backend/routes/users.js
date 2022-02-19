const express = require("express");
const User = require("../models/User")
const router = express.Router();

router.post("/", async (req, res) => {
    // retrieve data from request and make object
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    // save object in db and respond
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({message: error})
    }
    
});

module.exports = router;