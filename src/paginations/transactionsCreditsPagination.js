const { transactionsCreditsModel } = require("../db/transactionsCreditsModel");

const getTransactionsCreditsCount = async (filters = []) => {
  try {
    const count = await transactionsCreditsModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get transactions credits count");
  }
};

const getPaginatedTransactionsCredits = async (
  startIndex,
  limit,
  filters = {}
) => {
  try {
    let query = transactionsCreditsModel.find(filters);

    const transactionsCredits = await query.skip(startIndex).limit(limit).exec();
    return transactionsCredits;
  } catch (error) {
    throw new Error("Failed to get paginated transactions credits");
  }
};

module.exports = {
  getTransactionsCreditsCount,
  getPaginatedTransactionsCredits,
};
