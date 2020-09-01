const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product')

router.get("/categories", ProductController.get_categories);
router.get("/categories/:category", ProductController.get_product_category);
router.get("/trending", ProductController.get_trending)

module.exports = router;