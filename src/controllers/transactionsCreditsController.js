const transactionsCreditsFunction = require("../functions/transactionsCreditsFunction");
const { transactionsCreditsModel } = require("../db/transactionsCreditsModel");
const {
  getTransactionsCreditsCount,
  getPaginatedTransactionsCredits,
} = require("../paginations/transactionsCreditsPagination");

const createTransactionsCredits = async (req, res) => {
  try {
    const transactionsCreditsData = {
      clientId,
      placeId,
      add,
      quanty,
      createdAt,
      updatedAt,
    } =
    req.body;

    // Validate the request body against the schema
    const transactionsCredits = new transactionsCreditsModel(
      transactionsCreditsData
    );
    const validationError = transactionsCredits.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdTransactionsCredits =
      await transactionsCreditsFunction.createTransactionCredit(
        transactionsCreditsData
      );
    return res.json({
      msg: "Transaction Credit added",
      status: 201,
      data: createdTransactionsCredits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Transaction Credit" });
  }
};

const getTransactionsCredits = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const transactionsCreditsCount = await getTransactionsCreditsCount();
    const totalPages = Math.ceil(transactionsCreditsCount / limit);

    const criteria = req.params.criteria;
    const transactionsCredits = await getPaginatedTransactionsCredits(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated transactions Credits ",
      status: 201,
      data: transactionsCredits,
      meta: {
        totalItems: transactionsCreditsCount,
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

const updateTransactionsCredits = async (req, res) => {
  try {
    const transactionsCreditsId = req.params._id;
    const { _id, clientId, placeId, add, quanty, createdAt, updatedAt } =
      req.body;
    const dataToUpdate = {
      _id,
      clientId,
      placeId,
      add,
      quanty,
      createdAt,
      updatedAt,
    };

    const updatedTransactionsCredits =
      await transactionsCreditsFunction.updateTransactionCredit(
        transactionsCreditsId,
        dataToUpdate
      );

    return res.json({
      msg: "updated Transactions Credits ",
      status: 200,
      data: updatedTransactionsCredits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransactionsCredits = async (req, res) => {
  try {
    const transactionsCreditsId = req.params._id;

    await transactionsCreditsFunction.deleteTransactionCredit(
      transactionsCreditsId
    );
    return res.json({
      msg: "eliminated transactions Credits ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransactionsCredits,
  getTransactionsCredits,
  updateTransactionsCredits,
  deleteTransactionsCredits,
}