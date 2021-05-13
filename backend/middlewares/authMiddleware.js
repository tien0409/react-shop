const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { JWT_SECRET } = require("../configs/env");
const User = require("../models/userModel");

const authUser = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(400);
    throw new Error("Not authorized as an admin");
  }
});

module.exports = { authUser, authAdmin };
