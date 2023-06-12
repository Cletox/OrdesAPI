const ordersBuyFunction = require("../functions/ordersBuyFunction");
const { storageModel } = require("../db/ordersBuyModel");
const {
  getOrdersBuyCount,
  getPaginatedOrdersBuy,
} = require("../paginations/ordersBuyPagination");

const createOrdersBuy = async (req, res) => {
  try {
    const storageData = { productList, providerId, createdAt, updatedAt } = req.body;
    
    // Validate the request body against the schema
    const storage = new storageModel(storageData);
    const validationError = storage.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdStorage = await storageFunction.createStorage(storageData);
    return res.json({
      msg: "Storage added",
      status: 201,
      data: createdStorage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create storage" });
  }
};

const getOrdersBuy = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const storageCount = await getStorageCount();
    const totalPages = Math.ceil(storageCount / limit);

    const criteria = req.params.criteria;
    const storages = await getPaginatedStorage(startIndex, limit, criteria);

    return res.json({
      msg: "List of paginated storages ",
      status: 201,
      data: storages,
      meta: {
        totalItems: storageCount,
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

const updateOrdersBuy = async (req, res) => {
  try {
    const ordersBuyId = req.params._id;
    const {
      _id,
      productList: [],
      providerId,
      createdAt,
      updatedAt,
    } = req.body;
    const dataToUpdate = {
      _id,
      productList: [],
      providerId,
      createdAt,
      updatedAt,
    };

    const updatedStorage = await storageFunction.updateStorage(
      ordersBuyId,
      dataToUpdate
    );

    return res.json({
      msg: "updated Orders Buy ",
      status: 200,
      data: updatedStorage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrdersBuy = async (req, res) => {
  try {
    const ordersBuyId = req.params._id;

    await ordersBuyFunction.deleteOrderBuy(ordersBuyId);

    return res.json({
      msg: "eliminated Orders Buy ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createOrdersBuy,
  getOrdersBuy,
  updateOrdersBuy,
  deleteOrdersBuy
}