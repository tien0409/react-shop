const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

/*
 * @desc login user
 * @route POST /api/auth
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.validPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User or password wrong");
  }
});

module.exports = { loginUser };
