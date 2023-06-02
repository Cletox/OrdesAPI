const { invoicesModel } = require("../db/invoicesModel");

const getInvoicesCount = async (filters = []) => {
  try {
    const count = await invoicesModel.countDocuments(
      filters.length ? { $and: filters } : {}
    );
    return count;
  } catch (error) {
    throw new Error("Failed to get invoices count");
  }
};

const getPaginatedInvoices = async (startIndex, limit, filters = {}) => {
  try {
    let query = invoicesModel.find(filters);

    const invoices = await query.skip(startIndex).limit(limit).exec();
    return invoices;
  } catch (error) {
    throw new Error("Failed to get paginated invoices");
  }
};

module.exports = {
  getInvoicesCount,
  getPaginatedInvoices,
};
