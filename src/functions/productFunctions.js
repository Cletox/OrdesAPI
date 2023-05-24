const mongoose = require("mongoose");
const { productModel } = require("../db/productsModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
exports.createProduct = async (productData) => {
  try {
    const createdProduct = await productModel.create(productData);
    return createdProduct;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

exports.getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProduct = async (productId, updateData) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteProduct = async (productId) => {
  try {
    await productModel.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};
