const productService = require("../functions/productFunctions");
 const productModel = require("../db/productsModel");
// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, model, brand, categoryId } = req.body;
    const productData = { name, model, brand, categoryId };
    //const productData = req.body; // Alternative2

    // Validate the request body against the schema
    const product = new productModel(productData);
    const validationError = product.validateSync();
    if (validationError) {
        return res.json({
        status: 400,
        message: validationError.message
         });
    }
    const createdProduct = await productService.createProduct(productData);
    return res.json({
        msg: "Producto agregado",
        status: 201,
        data: createdProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};