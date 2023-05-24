const {
  transactionsInventoryModel,
} = require("../db/transactionsInventoryModel");

const getTransactionsInventoryCount = async (filters = []) => {
  try {
    const count = await transactionsInventoryModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get transactions inventory count");
  }
};

const getPaginatedTransactionsInventory = async (
  startIndex,
  limit,
  filters = {}
) => {
  try {
    let query = transactionsInventoryModel.find();

    if (filters.length) {
      query = query.and(filters);
    }

    const transactionsInventory = await query.skip(startIndex).limit(limit);
    return transactionsInventory;
  } catch (error) {
    throw new Error("Failed to get paginated transactions inventory");
  }
};

module.exports = {
  getTransactionsInventoryCount,
  getPaginatedTransactionsInventory,
};