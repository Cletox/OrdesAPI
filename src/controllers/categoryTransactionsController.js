const categoryTransactionFunction = require("../functions/categoryTransactionsFunction");
const {
  categoryTransactionsModel,
} = require("../db/categoryTransactionsModel");
const {
  getCategoryTransactionsCount,
  getPaginatedCategoryTransactions,
} = require("../paginations/categoryTransactionsPagination");

const createCategoryTransaction = async (req, res) => {
  try {
    
    const categoryTransactionData = { name, createdAt, updatedAt } = req.body ;

    // Validate the request body against the schema
    const categoryTransaction = new categoryTransactionsModel(
      categoryTransactionData
    );
    const validationError = categoryTransaction.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdCategoryTransaction =
      await categoryTransactionFunction.createCategoryTransaction(
        categoryTransactionData
      );
    return res.json({
      msg: "category transaction added",
      status: 201,
      data: createdCategoryTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category transaction" });
  }
};

const getCategoryTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const categoryTransactionCount = await getCategoryTransactionsCount();
    const totalPages = Math.ceil(categoryTransactionCount / limit);

    const criteria = req.params.criteria;
    const categoryTransaction = await getPaginatedCategoryTransactions(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated category transaction ",
      status: 201,
      data: categoryTransaction,
      meta: {
        totalItems: categoryTransactionCount,
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

const updateCategoryTransaction = async (req, res) => {
  try {
    const categoryTransactionId = req.params._id;
    const { _id, name, createdAt, updatedAt } = req.body;
    const dataToUpdate = { _id, name, createdAt, updatedAt };

    const updatedCategoryTransaction =
      await categoryTransactionFunction.updateCategoryTransaction(
        categoryTransactionId,
        dataToUpdate
      );

    return res.json({
      msg: "updated Category Transaction ",
      status: 200,
      data: updatedCategoryTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategoryTransaction = async (req, res) => {
  try {
    const categoryTransactionId = req.params._id;

    await categoryTransactionFunction.deleteCategoryTransaction(
      categoryTransactionId
    );
    return res.json({
      msg: "eliminated category transaction ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategoryTransaction,
  getCategoryTransactions,
  updateCategoryTransaction,
  deleteCategoryTransaction
}