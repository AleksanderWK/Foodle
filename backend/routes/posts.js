const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("got a get request on food route!")
});

module.exports = router;