const express = require("express");

const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProductReview,
} = require("../controllers/productController");
const { authUser, authAdmin } = require("../middlewares/authMiddleware");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);
router
  .route("/:id")
  .post(authUser, authAdmin, createProduct)
  .put(authUser, authAdmin, updateProduct)
  .delete(authUser, authAdmin, deleteProduct);
router.route("/:id/reviews").post(authUser, createProductReview);

module.exports = router;
