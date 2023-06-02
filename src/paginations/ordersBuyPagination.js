const { ordersBuyModel } = require("../db/ordersBuyModel");

const getOrdersBuyCount = async (filters = []) => {
  try {
    const count = await ordersBuyModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get orders buy count");
  }
};

const getPaginatedOrdersBuy = async (startIndex, limit, filters = {}) => {
  try {
    let query = ordersBuyModel.find(filters);


    const ordersBuy = await query.skip(startIndex).limit(limit).exec();
    return ordersBuy;
  } catch (error) {
    throw new Error("Failed to get paginated orders buy");
  }
};

module.exports = {
  getOrdersBuyCount,
  getPaginatedOrdersBuy,
};
