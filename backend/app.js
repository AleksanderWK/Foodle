const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
require("dotenv/config");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const usersRoute = require("./routes/users");
const groceriesRoute = require("./routes/groceries");

app.use(bodyParser.json());

app.use("/users", usersRoute);

app.use("/groceries", groceriesRoute);

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB!");
});

//LISTENING
app.listen(port);
