const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /products - Create a new product
router.post('/products', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
module.exports = router;