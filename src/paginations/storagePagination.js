const { storageModel } = require("../db/storageModel");

const getStorageCount = async (filters = []) => {
  try {
    const count = await storageModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get storage count");
  }
};

const getPaginatedStorage = async (startIndex, limit, filters = {}) => {
  try {
    let query = storageModel.find();

    if (filters.length) {
      query = query.and(filters);
    }

    const storage = await query.skip(startIndex).limit(limit);
    return storage;
  } catch (error) {
    throw new Error("Failed to get paginated storages");
  }
};

module.exports = {
  getStorageCount,
  getPaginatedStorage,
};
