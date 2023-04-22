const Product = require("../models/product");

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
