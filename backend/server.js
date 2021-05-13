require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const connectDb = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 5000;
connectDb();

// middlewares custom
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// router
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");
const productRoutes = require("./router/productRoutes");
const categoryRoutes = require("./router/categoryRoutes");
const uploadRoutes = require("./router/uploadRoutes");
const orderRoutes = require("./router/orderRoutes");

const { PAYPAL_CLIENT_ID } = require("./configs/env");

app.use(morgan("dev"));
app.use(express.json());
app.use(
  "/public/images",
  express.static(path.join(__dirname, "/public/images")),
);

app.get("/", (req, res) => {
  res.send("abc");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/config/paypal", (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
