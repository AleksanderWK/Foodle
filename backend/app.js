const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
require("dotenv/config");

app.use(bodyParser.json())

const usersRoute = require("./routes/users")
app.use("/register", usersRoute)

const groceriesRoute = require("./routes/groceries")
app.use("/groceries", groceriesRoute)

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, ()=>{
    console.log("Connected to MongoDB!")
})

//LISTENING
app.listen(port)