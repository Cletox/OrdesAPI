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
    let query = categoriesInventoryModel.find(filters); // use case more concise
    //const query = categoriesInventoryModel.find().and(filters); //provide flexibility by aloowing more filters,sorts optiones, etc
    
    const categoriesInventory = await query.skip(startIndex).limit(limit).exec();
    return categoriesInventory;
  } catch (error) {
    throw new Error("Failed to get paginated categories Inventory ");
  }
};

module.exports = {
  getCategoriesInventoryCount,
  getPaginatedCategoriesInventory,
};
