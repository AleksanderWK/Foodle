const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
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

//CONNECT TO MONGODB

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to MongoDB!");
  const gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  const gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
  app.locals.gfs = gfs;
  app.locals.gridfsBucket = gridfsBucket;
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: { userId: req.body.userId },
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
exports.upload = upload;

// ROUTES
const usersRoute = require("./routes/users");
const groceriesRoute = require("./routes/groceries");
const shoppinglistRoute = require("./routes/shoppinglists");
const mealsRoute = require("./routes/meals");
const consumptionsRoute = require("./routes/consumptions");
const goalsRoute = require("./routes/goals");
const favoriteRoute = require("./routes/favoritelists");

app.use("/users", usersRoute);
app.use("/groceries", groceriesRoute);
app.use("/shoppinglists", shoppinglistRoute);
app.use("/meals", mealsRoute);
app.use("/consumptions", consumptionsRoute);
app.use("/goals", goalsRoute);
app.use("/favoritelists", favoriteRoute);

//LISTENING
app.listen(port);
