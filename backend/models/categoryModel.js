const mongoose = require("mongoose");

const Product = require("./productModel");

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamp: true },
);

categorySchema.pre("remove", async function (req) {
  await Product.deleteMany({ category: this._id });
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
