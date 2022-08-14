const Token = require("../models/token");

const isAuthenticated = (req, res, next) => {
  accessToken = req.headers["authorization"];
  if (accessToken) {
    Token.find({ token: accessToken.split(" ")[1] }).exec((error, token) => {
      if (error) {
        return next(error);
      } else {
        if (token === null) {
          const err = new Error("Access denied");
          err.status = 401;
          return next(err);
        } else {
          console.log("Access");
          return next();
        }
      }
    });
  } else {
    const err = new Error("Access denied");
    err.status = 401;
    return next(err);
  }
};

module.exports = isAuthenticated;
