const {
  categoryTransactionsModel,
} = require("../db/categoryTransactionsModel");

const getCategoryTransactionsCount = async (filters = []) => {
  try {
    const count = await categoryTransactionsModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get category transactions count");
  }
};

const getPaginatedCategoryTransactions = async (
  startIndex,
  limit,
  filters = {}
) => {
  try {
    let query = categoryTransactionsModel.find(filters);

    const categoryTransactions = await query.skip(startIndex).limit(limit).exec();
    return categoryTransactions;
  } catch (error) {
    throw new Error("Failed to get paginated category transactions");
  }
};

module.exports = {
  getCategoryTransactionsCount,
  getPaginatedCategoryTransactions,
};
