const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const storageController = require("../controllers/storageController")
const {validateCreateProduct} = require ("../validations/productValidations/createProductValidation");

// product routers
router.post('/products/new', validateCreateProduct, productController.createProduct);
//get products routers
router.get('/getAllProducts', productController.getAllProducts);
//rest of crud router
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);


//storage routers
router.post('/storage/new/:criteria[]', storageController.createStorage);
//get products routers
router.get('/getAllStorage', storageController.getStorages);
//rest of crud router
router.put('/storage/:id', storageController.updateStorage);
router.delete('/storage/:id', storageController.deleteStorage);
 




module.exports = router;