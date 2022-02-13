const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001
require("dotenv/config")

const postRoute = require("./routes/posts")
app.use("/food", postRoute)

//HOME ROUTE
app.get("/", (req, res) => {
    res.send("home")
});

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, ()=>{
    console.log("Connected to MongoDB!")
})

//LISTENING
app.listen(port)