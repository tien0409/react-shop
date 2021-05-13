const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

/*
 * @desc Create a category
 * @route POST /api/category
 * @access Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    res.status(400);
    throw new Error("Category exist.");
  }

  const category = new Category({ user: req.user._id, name });
  await category.save();
  res.status(200).json(category);
});

/*
 * @desc Get all categories
 * @route GET /api/category
 * @access Public
 */
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

/*
 * @desc Get category by id
 * @route GET /api/category/:id
 * @access Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category not found.");
  }
});

/*
 * @desc Delete category and product in category
 * @route DELETE /api/category/:id
 * @access Private/Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  if (category.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Can not delete product created by other admin.");
  }

  await category.remove();
  res.status(200).json({ message: "Removed success." });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
