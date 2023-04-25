const Product = require("../models/product");
const { HttpError } = require("../helpers");
// const Cart = require("../models/cart");
const { validationResult } = require("express-validator");

let cart = [];

const productController = {
  async getAll(req, res) {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      throw HttpError(500, "Error server");
    }
  },
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw HttpError(404, "Not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      throw HttpError(500, "Error server");
    }
  },
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      throw HttpError(500, "Error server");
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        throw HttpError(404, "Not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      throw HttpError(500, "Error server");
    }
  },
  async remove(req, res) {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      if (!product) {
        throw HttpError(404, "Not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      throw HttpError(500, "Error server");
    }
  },
  async addToCart(req, res) {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Додаємо товар до корзини або збільшуємо кількість, якщо такий товар вже є в корзині
    const updatedCart = [...cart];
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ productId: product._id, quantity: quantity || 1 });
    } else {
      updatedCart[updatedItemIndex].quantity =
        updatedCart[updatedItemIndex].quantity + parseInt(quantity, 10) ||
        updatedCart[updatedItemIndex].quantity + 1;
    }

    // Обчислюємо загальну суму корзини
    const totalPrice = updatedCart.reduce(
      (sum, item) => sum + item.quantity * product.price,
      0
    );

    cart = updatedCart;

    return res.status(200).json({
      message: `Product with ID ${productId} added to cart`,
      cart,
      totalPrice,
    });
  },
};

module.exports = productController;
