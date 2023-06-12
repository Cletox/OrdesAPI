const { Product } = require("../db/productsModel");
const validation = require("../validations/generalValidation");
const { Account } = require("../db/accounts_delete_requests");
const mongoose = require('mongoose');
const createProduct = async (req, res) => {
  try {
    const { data } = req.body;

    if (!validation.validateObjectValues(data, validation.regexToFullNames)) {
      return res
        .status(400)
        .json({ msg: "invalid product data, check values" });
    } else{
      const createdProduct = await Product.create(data);
      return res.json({
        msg: "Product added",
        status: 201,
        data: createdProduct,
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let { page, limit } = req.params;
    const filters = req.query.filters ? JSON.parse(decodeURIComponent(req.query.filters)) : {};
    if (filters._id) {
      filters._id =  new mongoose.Types.ObjectId(filters._id);
    }
    
   if (
      !validation.validateNumber(req.query.page) ||
      !validation.validateNumber(req.query.limit)
    ) {
      return res
        .status(400)
        .json({
          msg: "Make sure to set valid numbers into page and limits values",
        });
    } else {
      page = req.params.page ?? 1;
      limit = req.params.limit ?? 10;
    }
    
    const pipeline = [
      { $match:  filters  },
      { $group: { _id: null, productsCount: { $sum: 1 }, data: { $push: "$$ROOT" } } },
    { $project: { "data._id": 0, "data.__v": 0 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];
    
    const [productData] = await Product.aggregate(pipeline);

    if (!productData) {
      return res.json({
        msg: "This search process retrieve an empty result. invalid /filters/ or inexistent data collection",
        status: 200,
        totalCount: 0,
        data: [],
      });
    }

    const { productsCount, data } = productData;
    const totalPages = Math.ceil(productsCount / limit);
    return res.json({
      msg: "List of paginated products.",
      status: 200,
      data: data,
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
    const { data } = req.body;
    if (!validation.validateObjectId(req.params._id)) {
      return res.status(400).json({ msg: "Make sure to set a valid _id" });
    }
    if (!validation.validateObjectValues(data, validation.regexToFullNames)) {
      return res
        .status(400)
        .json({ msg: "invalid product data, check values to update" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params._id,
      data,
      { runValidators: true }
    );

    return res.json({
      msg: "updated product: ",
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!validation.validateObjectId(req.params._id)) {
      return res.status(400).json({ msg: "Make sure to set a valid _id" });
    } else {
      await Product.findByIdAndDelete(req.params._id);
      return res.json({
        msg: "product eliminated",
        status: 204,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
