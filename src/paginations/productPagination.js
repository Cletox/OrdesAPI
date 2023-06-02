const { productModel } = require("../db/productsModel");

const getProductsCount = async () => {
  try {
    const count = await productModel.countDocuments();
    return count;
  } catch (error) {
    throw new Error("Failed to get products count");
  }
};

const getPaginatedProducts = async (startIndex, limit, filters = {}) => {
  try {
    let query = productModel.find(filters);

    const products = await productModel.skip(startIndex).limit(limit).exec();
    return products;
  } catch (error) {
    throw new Error("Failed to get paginated products");
  }
};

module.exports = {
  getProductsCount,
  getPaginatedProducts,
};
