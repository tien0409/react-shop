const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../configs/env");

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

module.exports = generateToken;
