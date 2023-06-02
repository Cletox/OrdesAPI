const productFunctions = require("../functions/productFunctions");
const { Product } = require("../db/productsModel");
// const {
//   getProductsCount,
//   getPaginatedProducts,
// } = require("../paginations/productPagination");
// const { default: mongoose } = require("mongoose");
// const { ObjectId } = mongoose.Types;

const createProduct = async (req, res) => {
  try {
    const productData = ({ name, model, brand, categoryId } = req.body);

    // Validate the request body against the schema
    const product = new productModel(productData);
    const validationError = product.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdProduct = await productFunctions.createProduct(productData);
    return res.json({
      msg: "Product added",
      status: 201,
      data: createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const productsCount = await Product.countDocuments();
    const totalPages = Math.ceil(productsCount / limit);

    const criteria = req.params.criteria || {};
    // const products = await getPaginatedProducts(startIndex, limit, criteria);
    // Otro método:
    const products = await Product.find(criteria).skip(startIndex).limit(limit).exec();

    return res.json({
      msg: "List of paginated products.",
      status: 200,
      data: products,
      meta: {
        totalItems: productsCount,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, model, brand, categoryId } = req.body;
    const updateData = { name, model, brand, categoryId };

    const updatedProduct = await productFunctions.updateProduct(
      productId,
      updateData
    );

    return res.json({
      msg: "updated product ",
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await productFunctions.deleteProduct(productId);

    return res.json({
      msg: "eliminated product ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
