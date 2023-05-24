const { inventoryModel } = require("../db/inventoryModel");

const getInventoryCount = async (filters = []) => {
  try {
    const count = await inventoryModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get inventory count");
  }
};

const getPaginatedInventory = async (startIndex, limit, filters = {}) => {
  try {
    let query = inventoryModel.find();

    if (filters.length) {
      query = query.and(filters);
    }

    const inventory = await query.skip(startIndex).limit(limit);
    return inventory;
  } catch (error) {
    throw new Error("Failed to get paginated inventories");
  }
};

module.exports = {
  getInventoryCount,
  getPaginatedInventory,
};
