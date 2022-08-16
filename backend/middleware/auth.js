const Token = require("../models/token");

const isAuthenticated = (req, res, next) => {
  accessToken = req.headers["authorization"];
  if (accessToken) {
    Token.findOne({ token: accessToken.split(" ")[1] }).exec((error, token) => {
      if (error) {
        return next(error);
      } else {
        if (isTokenOutdated(token) || token === null) {
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
  const now = new Date().getTime();
  const tokenCreationDate = new Date(token.dateCreated).getTime();
  const millisecondsInADaY = 86400000;
  return now - tokenCreationDate > millisecondsInADaY;
};

module.exports = isAuthenticated;
