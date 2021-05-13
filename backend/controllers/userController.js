const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

/*
 * @desc register user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  const user = User({ name, email, password });
  await user.save();

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

/*
 * @desc Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/*
 * @desc Get user by id
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json(user);
});

/*
 * @desc Update user
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, isAdmin } = req.body;
  console.log("password", password);

  // has id => admin update user, no id => user update profile
  const user = await User.findById(id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = password;
  }
  user.isAdmin = isAdmin;
  await user.save();

  res.status(200).json({
    message: "Updated success.",
  });
});

/*
 * @desc Get my profile
 * @route GET /api/users/profile
 * @access Private
 */
const getMyProfile = asyncHandler(async (req, res) => {
  const myProfile = await User.findById(req.user._id).select("-password");
  res.status(200).json(myProfile);
});

/*
 * @desc Update my profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateMyProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const myProfile = await User.findById(req.user._id).select("-password");

  myProfile.name = name || myProfile.name;
  myProfile.email = email || myProfile.email;
  if (password) {
    myProfile.password = password;
  }
  await myProfile.save();

  res.status(200).json({
    _id: myProfile._id,
    name: myProfile.name,
    email: myProfile.email,
    isAdmin: myProfile.isAdmin,
    token: generateToken(myProfile._id),
  });
});

/*
 * @desc Delete a user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  await user.remove();
  res.status(200).json({ message: "Removed success." });
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  getMyProfile,
  updateUser,
  updateMyProfile,
  deleteUser,
};
