const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
require("dotenv/config");
const cors = require("cors");

// MIDDLEWARE
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// ROUTES
const usersRoute = require("./routes/users");
const groceriesRoute = require("./routes/groceries");
const shoppinglistRoute = require("./routes/shoppinglists");
const mealsRoute = require("./routes/meals");

app.use("/users", usersRoute);
app.use("/groceries", groceriesRoute);
app.use("/shoppinglists", shoppinglistRoute);
app.use("/meals", mealsRoute);

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB!");
});

//LISTENING
app.listen(port);
