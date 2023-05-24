const { categoriesInventoryModel } = require("../db/categoriesInventoryModel");

const getCategoriesInventoryCount = async (filters = []) => {
  try {
    const count = await categoriesInventoryModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get categories Inventory count");
  }
};

const getPaginatedCategoriesInventory = async (
  startIndex,
  limit,
  filters = {}
) => {
  try {
    let query = categoriesInventoryModel.find();

    if (filters.length) {
      query = query.and(filters);
    }

    const storage = await query.skip(startIndex).limit(limit);
    return storage;
  } catch (error) {
    throw new Error("Failed to get paginated categories Inventory ");
  }
};

module.exports = {
  getCategoriesInventoryCount,
  getPaginatedCategoriesInventory,
};
