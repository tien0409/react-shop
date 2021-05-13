const express = require("express");
const {
  getOrderById,
  addOrderItems,
  updatePaidOrder,
  updateDeliverOrder,
  getAllOrders,
  getAllOrdersByAdmin,
} = require("../controllers/orderController");
const { authUser, authAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(authUser, getAllOrders).post(authUser, addOrderItems);
router.route("/admin").get(authUser, authAdmin, getAllOrdersByAdmin);
router.route("/:id").get(authUser, getOrderById);
router.route("/:id/pay").put(authUser, updatePaidOrder);
router.route("/:id/deliver").put(authUser, authAdmin, updateDeliverOrder);

module.exports = router;
