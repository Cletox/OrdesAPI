const { providersModel } = require("../db/providersModel");

const getProviderCount = async (filters = []) => {
  try {
    const count = await providersModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get provider count");
  }
};

const getPaginatedProvider = async (startIndex, limit, filters = {}) => {
  try {
    let query = providersModel.find();

    if (filters.length) {
      query = query.and(filters);
    }

    const provider = await query.skip(startIndex).limit(limit);
    return provider;
  } catch (error) {
    throw new Error("Failed to get paginated providers");
  }
};

module.exports = {
  getProviderCount,
  getPaginatedProvider,
};
