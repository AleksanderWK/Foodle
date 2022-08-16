const express = require("express");
const { upload, gfs } = require("../app");
const ShoppingList = require("../models/ShoppingList");
const User = require("../models/User");
const Token = require("../models/token");
const router = express.Router();
const { sendEmail } = require("../utils/emailUtils");
const crypto = require("crypto");
const FavoriteList = require("../models/FavoriteList");
const isAuthenticated = require("../middleware/auth");

// /users

router.post("/register", async (req, res) => {
  // retrieve data from request and make object
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // save object in db and respond
  try {
    // save user
    let savedUser = await user.save();

    // create and save shoppinglist
    const shoppinglist = new ShoppingList({
      owner: savedUser._id,
    });
    const savedshl = await shoppinglist.save();

    // create and save favoriteslist
    const favoriteslist = new FavoriteList({
      owner: savedUser._id,
    });
    const savedfl = await favoriteslist.save();

    // update saved user with shoppinglist id and favoriteslist id and save again
    savedUser.shoppinglist = savedshl._id;
    savedUser.favoritelist = savedfl._id;
    savedUser = await savedUser.save();

    // Create verification token
    const randomToken = crypto.randomBytes(128).toString("hex");
    const verification_token = new Token({
      userId: savedUser._id,
      token: randomToken,
    });
    await verification_token.save();
    // Send verification email to user
    sendEmail(
      req.body,
      "Velkommen til Foodle!",
      `<p>Hei ${req.body.username}! Verifiser deg for å starte å bruke Foodle.</p> \n
    <form action="http://localhost:3001/users/verify/${randomToken}">
    <input type="submit" value="Verifiser" />
</form>
    `
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (foundUser.verified) {
      const randomToken = crypto.randomBytes(128).toString("hex");
      const accessToken = new Token({
        userId: foundUser._id,
        token: randomToken,
      });
      await accessToken.save();
      foundUser.accessToken = accessToken._id;
      foundUser = await foundUser.save();
      foundUser = await foundUser.populate("accessToken");
      res.json(foundUser);
    } else if (foundUser && !foundUser.verified) {
      res.status(401).json();
    }
  } catch (error) {
    res.status(404).json();
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    Token.findOneAndDelete({ token: req.params.token }).then((result) =>
      User.findByIdAndUpdate(result.userId, { verified: true })
    );
    res.redirect("http://localhost:3000");
  } catch (error) {
    res.json(error);
  }
});

router.get("/:username/shoppinglist", isAuthenticated, async (req, res) => {
  User.find({ username: req.params.username })
    .populate("shoppinglist")
    .then((user) => res.json(user));
});

// upload file with metadat set as user id
router.post("/upload", upload.single("file"), async (req, res) => {
  res.json({ file: req.file });
});

// get file
router.get("/:userid/picture", async (req, res) => {
  const gfs = req.app.locals.gfs;
  const gridfsBucket = req.app.locals.gridfsBucket;
  const file = await gfs.files.findOne({
    metadata: { userId: req.params.userid },
  });
  try {
    if (file == null) {
      throw new Error();
    }
    if (
      (file.contentType == "image/png") |
      (file.contentType == "image/jpeg") |
      (file.contentType == "image/jpg")
    ) {
      const rs = gridfsBucket.openDownloadStream(file._id);
      rs.pipe(res);
    } else throw new Error();
  } catch (error) {
    res.status(404).json(null);
  }
});

router.get("/logout", isAuthenticated, (req, res) => {
  accessToken = req.headers["authorization"];
  try {
    Token.findOneAndDelete({ token: accessToken.split(" ")[1] }).then(() =>
      res.status(200).json()
    );
  } catch (error) {
    res.status(500).json();
  }
});

module.exports = router;
