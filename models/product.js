const mongoose = require("mongoose");

// створюємо схему товару
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

// створюємо модель товару на основі схеми
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
