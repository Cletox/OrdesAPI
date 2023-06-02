const mongoose = require("mongoose");
const {
  categoryTransactionsModel,
} = require("../db/categoryTransactionsModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCategoryTransaction = async (categoryData) => {
  try {
    const createdCategory = await categoryTransactionsModel.create(
      categoryData
    );
    return createdCategory;
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

const getAllCategoryTransactions = async () => {
  try {
    const categories = await categoryTransactionsModel.find();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoryTransaction = async (categoryId, updateData) => {
  try {
    const updatedCategory = await categoryTransactionsModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategoryTransaction = async (categoryId) => {
  try {
    await categoryTransactionsModel.findByIdAndDelete(categoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCategoryTransaction,
  getAllCategoryTransactions,
  updateCategoryTransaction,
  deleteCategoryTransaction
}
