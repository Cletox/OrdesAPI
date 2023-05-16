const mongoose = require('mongoose');
const Product = require('../db/productsModel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Create a new product
exports.createProduct = async (productData) => {
  try {
    const createdProduct = await Product.create(productData);
    return createdProduct;
  } catch (error) {
    throw new Error('Failed to create product');
  }
};