// const { Product } = require("../db/productsModel");

// const getProductsCount = async () => {
//   try {
//     const count = await Product.countDocuments();
//     return count;
//   } catch (error) {
//     throw new Error("Failed to get products count");
//   }
// };

// const getPaginatedProducts = async (startIndex, limit, filters = {}) => {
//   try {
//     let query = await productModel.find(filters);
//     const products = await query.skip(startIndex).limit(limit).exec();
//     return products;
//   } catch (error) {
//     throw new Error("Failed to get paginated products");
//   }
// };

// module.exports = {
//   getProductsCount,
//   getPaginatedProducts,
// };
