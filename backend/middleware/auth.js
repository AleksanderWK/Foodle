const Token = require("../models/token");

const isAuthenticated = (req, res, next) => {
  accessToken = req.headers["authorization"];
  if (accessToken) {
    Token.find({ token: accessToken.split(" ")[1] }).exec((error, token) => {
      if (error) {
        return next(error);
      } else {
        if (token === null && isTokenOutdated(token)) {
          const err = new Error("Access denied");
          err.status = 401;
          return next(err);
        } else {
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

const isTokenOutdated = (token) => {
  //TODO
  return false;
};

module.exports = isAuthenticated;
