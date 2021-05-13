const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");

/*
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json(orders);
});

/*
 * @desc Get all orders by admin
 * @route GET /api/orders/admin
 * @access Private/Admin
 */
const getAllOrdersByAdmin = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name");
  res.status(201).json(orders);
});

/*
 * @desc Create a order
 * @route POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      itemsPrice,
      shippingPrice,
    });

    await order.save();
    res.status(201).json(order);
  }
});

/*
 * @desc Get order by id
 * @route GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

/*
 * @desc Update paid order
 * @route PUT /api/order/:id/pay
 * @access Private
 */
const updatePaidOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };
  await order.save();
  res.status(200).json(order);
});

/*
 * @desc Update delivered order
 * @route PUT /api/order/:id/deliver
 * @access Private
 */
const updateDeliverOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();
  res.status(200).json(order);
});

module.exports = {
  addOrderItems,
  getOrderById,
  getAllOrders,
  getAllOrdersByAdmin,
  updatePaidOrder,
  updateDeliverOrder,
};
