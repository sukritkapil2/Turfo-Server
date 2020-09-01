const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product')

router.get("/categories", ProductController.get_categories);
router.get("/categories/:category", ProductController.get_product_category);

module.exports = router;