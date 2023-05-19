const Product = require('../db/productsModel');

const getProductsCount = async () => {
  try {
    const count = await Product.countDocuments();
    return count;
  } catch (error) {
    throw new Error('Failed to get products count');
  }
};

const getPaginatedProducts = async (startIndex, limit) => {
  try {
    const products = await Product.find().skip(startIndex).limit(limit);
    return products;
  } catch (error) {
    throw new Error('Failed to get paginated products');
  }
};

module.exports = {
  getProductsCount,
  getPaginatedProducts,
};