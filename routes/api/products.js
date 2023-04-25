const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");
const productValidationRules = require("../../controllers/products");

// GET /products - отримати всі товари
router.get("/", productController.getAll);

// GET /products/:id - отримати товар за ідентифікатором
router.get("/:id", productController.getById);

// POST /products - створити новий товар
router.post("/", productValidationRules, productController.create);

// PUT /products/:id - оновити товар за ідентифікатором
router.put("/:id", productValidationRules, productController.update);

// DELETE /products/:id - видалити товар за ідентифікатором
router.delete("/:id", productController.remove);

module.exports = router;
