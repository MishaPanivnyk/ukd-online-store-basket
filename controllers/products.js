const Product = require("../models/product");
const { HttpError } = require("../helpers");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

export const productValidationRules = [
  body("name").exists(),
  body("description").exists(),
  body("price").exists(),
];
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
};

module.exports = productController;
