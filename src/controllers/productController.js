const productService = require("../functions/productFunctions");
const productModel = require("../db/productsModel");
const { getProductsCount, getPaginatedProducts } = require('../paginations/productPagination');


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



exports.getAllProducts = async (req, res) => {
    try {

        const categoryId = req.query.categoryId;
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of items per page
        const startIndex = (page - 1) * limit; // Starting index of the current page
        const productsCount = await getProductsCount();
        const totalPages = Math.ceil(productsCount / limit);

    if (!categoryId) {
      return res.status(400).json({ message: 'categoryId is required' });
    }

    

    const products = await getPaginatedProducts(startIndex, limit);
      
      return res.json({
        msg: "List of products",
        status: 201,
        data: products,
        meta: {
          totalItems: productsCount,
          itemsPerPage: limit,
          totalPages: totalPages,
          currentPage: page,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null
        }
    });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body;
  
      const updatedProduct = await productService.updateProduct(productId, updateData);
      
      return res.json({
        msg: "updated product ",
        status: 200,
        data: updatedProduct
    });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
  
      await productFunction.deleteProduct(productId);
      
      return res.json({
        msg: "eliminated product ",
        status: 204,
      });


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };