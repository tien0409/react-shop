const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

/*
 * @desc Get all products
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const products = await Product.find({ ...keyword });
  res.status(200).json(products);
});

/*
 * @desc Get product by id
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const category = await Category.findById(product.category);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  res.status(200).json({
    _id: product._id,
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand,
    rating: product.rating,
    price: product.price,
    countInStock: product.countInStock,
    category: product.category,
    categoryName: category.name,
    reviews: product.reviews,
    user: product.user,
  });
});

/*
 * @desc Create product
 * @route POST /api/products/:id
 * @access Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, image, brand, countInStock, price } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  const productExist = await Product.findOne({ name });
  if (productExist) {
    res.status(400);
    throw new Error("Product already exist.");
  }

  const product = new Product({
    user: req.user._id,
    category: id,
    name,
    description,
    image,
    brand,
    price,
    countInStock,
  });
  await product.save();

  res.status(201).json({ message: "Created product success." });
});

/*
 * @desc Update product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    categoryId,
    name,
    description,
    image,
    brand,
    countInStock,
    price,
  } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Can not update product created by other admin.");
  }

  product.category = categoryId;
  product.name = name;
  product.description = description;
  product.image = image || product.image;
  product.brand = brand;
  product.price = price;
  product.countInStock = countInStock;

  await product.save();

  res.status(201).json({ message: "Updated success." });
});

/*
 * @desc Delete product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Can not delete product created by other admin.");
  }

  await product.remove();
  res.status(201).json({ message: "Removed success." });
});

/*
 * @desc Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const existReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );
  console.log(existReviewed);

  if (existReviewed) {
    res.status(400);
    throw new Error("Product already reviewed.");
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
  };

  product.reviews.push(review);
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review added." });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
};
