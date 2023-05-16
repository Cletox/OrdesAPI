const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /products - Create a new product
router.post('/products', productController.createProduct);

module.exports = router;