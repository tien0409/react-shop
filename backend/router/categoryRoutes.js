const express = require("express");

const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/categoryController");
const { authUser, authAdmin } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(authUser, authAdmin, createCategory)
  .get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(authUser, authAdmin, deleteCategory);

module.exports = router;
