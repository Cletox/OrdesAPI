const { creditsModel } = require("../db/creditsModel");

const getCreditsCount = async (filters = []) => {
  try {
    const count = await creditsModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get credits count");
  }
};

const getPaginatedCredits = async (startIndex, limit, filters = {}) => {
  try {
    let query = creditsModel.find(filters);

    const credits = await query.skip(startIndex).limit(limit).exec();
    return credits;
  } catch (error) {
    throw new Error("Failed to get paginated credits");
  }
};

module.exports = {
  getCreditsCount,
  getPaginatedCredits,
};
