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

//const getPaginatedStorage = async (startIndex, limit, filters = {}) => {
  const getPaginatedStorage = async (startIndex, limit) => {
  try {

    let query = storageModel.find();
    const storage = await query.skip(startIndex).limit(limit).exec();
    console.log('Fetched storages:', storage);
    return storage;
  } catch (error) {
    throw new Error("Failed to get paginated storages");
  }
};

module.exports = {
  getStorageCount,
  getPaginatedStorage,
};
