const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");
const { body } = require("express-validator");
const productValidationRules = [
  body("name").exists(),
  body("description").exists(),
  body("price").exists(),
];
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

router.post(
  "/addToCart",
  [body("productId").notEmpty().withMessage("Product ID is required")],
  productController.addToCart
);

module.exports = router;
