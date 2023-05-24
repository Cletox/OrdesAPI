const transactionFunction = require("../functions/transactionsFunction");
const { transactionsModel } = require("../db/transactionsModel");
const {
  getTransactionsCount,
  getPaginatedTransactions,
} = require("../paginations/transactionsPagination");

exports.createTransaction = async (req, res) => {
  try {
    const {
      _id,
      placeId,
      categoryTransactionsId,
      value,
      add,
      createdAt,
      updatedAt,
    } = req.body;
    const transactionData = {
      _id,
      placeId,
      categoryTransactionsId,
      value,
      add,
      createdAt,
      updatedAt,
    };

    // Validate the request body against the schema
    const transaction = new transactionsModel(transactionData);
    const validationError = transaction.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdTransaction = await transactionFunction.createTransaction(
      transactionData
    );
    return res.json({
      msg: "transaction added",
      status: 201,
      data: createdTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const transactionCount = await getTransactionsCount();
    const totalPages = Math.ceil(transactionCount / limit);

    const criteria = req.params.criteria;
    const transactions = await getPaginatedTransactions(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated  transactions ",
      status: 201,
      data: transactions,
      meta: {
        totalItems: transactionCount,
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

exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params._id;
    const {
      _id,
      placeId,
      categoryTransactionsId,
      value,
      add,
      createdAt,
      updatedAt,
    } = req.body;
    const dataToUpdate = {
      _id,
      placeId,
      categoryTransactionsId,
      value,
      add,
      createdAt,
      updatedAt,
    };

    const updatedTransaction = await transactionFunction.updateTransaction(
      transactionId,
      dataToUpdate
    );
    //dataToUpdate must be dataToUpdate:[]

    return res.json({
      msg: "updated  Transaction ",
      status: 200,
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params._id;

    await transactionFunction.deleteTransaction(transactionId);
    return res.json({
      msg: "eliminated  transaction ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
