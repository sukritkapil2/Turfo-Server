const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const ShopController = require('../controllers/shop')

router.get('/', ShopController.get_shops);

router.post('/', checkAuth, ShopController.add_shop);

module.exports = router;