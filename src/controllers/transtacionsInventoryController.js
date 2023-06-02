const transtacionsInventoryFunction = require("../functions/transtacionsInventoryFunction");
const {
  transactionsInventoryModel,
} = require("../db/transactionsInventoryModel");
const {
  getTransactionsInventoryCount,
  getPaginatedTransactionsInventory,
} = require("../paginations/transtacionsInventoryPagination");

const createTranstacionsInventory = async (req, res) => {
  try {
    const transtacionsInventoryData = {
     productId,
      quanty,
      date,
      add,
      createdAt,
      updatedAt,
    } = req.body;

    // Validate the request body against the schema
    const transtacionsInventory = new transactionsInventoryModel(
      transtacionsInventoryData
    );
    const validationError = transtacionsInventory.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdTranstacionsInventory =
      await transtacionsInventoryFunction.createTransactionInventory(
        transtacionsInventoryData
      );
    return res.json({
      msg: "transtacions Inventory added",
      status: 201,
      data: createdTranstacionsInventory,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create Transtacions Inventory" });
  }
};

const getSTranstacionsInventory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const transtacionsInventoryCount = await getTransactionsInventoryCount();
    const totalPages = Math.ceil(transtacionsInventoryCount / limit);

    const criteria = req.params.criteria;
    const transtacionsInventory = await getPaginatedTransactionsInventory(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated transtacions Inventory  ",
      status: 201,
      data: transtacionsInventory,
      meta: {
        totalItems: transtacionsInventoryCount,
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

const updateTranstacionsInventory = async (req, res) => {
  try {
    const transtacionsInventoryId = req.params._id;
    const { _id, productId, quanty, date, add, createdAt, updatedAt } =
      req.body;
    const dataToUpdate = {
      _id,
      productId,
      quanty,
      date,
      add,
      createdAt,
      updatedAt,
    };

    const updatedTranstacionsInventory =
      await transtacionsInventoryFunction.updateTransactionInventory(
        transtacionsInventoryId,
        dataToUpdate
      );

    return res.json({
      msg: "updated Transtacions Inventory ",
      status: 200,
      data: updatedTranstacionsInventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTranstacionsInventory = async (req, res) => {
  try {
    const transtacionsInventoryId = req.params._id;

    await transtacionsInventoryFunction.deleteTransactionInventory(
      transtacionsInventoryId
    );

    return res.json({
      msg: "eliminated Transtacions Inventory ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTranstacionsInventory,
  getSTranstacionsInventory,
  updateTranstacionsInventory,
  deleteTranstacionsInventory
}