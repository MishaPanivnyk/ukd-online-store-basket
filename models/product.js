const { Schema, model } = require("mongoose");

// создаем схему товара
const productSchema = new Schema({
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

// создаем модель товара на основе схемы
const Product = model("Product", productSchema);

module.exports = Product;
