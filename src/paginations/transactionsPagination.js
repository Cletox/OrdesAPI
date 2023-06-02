const { transactionsModel } = require("../db/transactionsModel");

const getTransactionsCount = async (filters = []) => {
  try {
    const count = await transactionsModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get transactions count");
  }
};

const getPaginatedTransactions = async (startIndex, limit, filters = {}) => {
  try {
    let query = transactionsModel.find(filters);

    const transactions = await query.skip(startIndex).limit(limit).exec();
    return transactions;
  } catch (error) {
    throw new Error("Failed to get paginated transactions");
  }
};

module.exports = {
  getTransactionsCount,
  getPaginatedTransactions,
};
