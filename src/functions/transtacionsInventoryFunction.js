const mongoose = require("mongoose");
const {
  transactionsInventoryModel,
} = require("../db/transactionsInventoryModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createTransactionInventory = async (transactionData) => {
  try {
    const createdTransaction = await transactionsInventoryModel.create(
      transactionData
    );
    return createdTransaction;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
};

const getAllTransactionsInventory = async () => {
  try {
    const transactions = await transactionsInventoryModel.find();
    return transactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTransactionInventory = async (transactionId, updateData) => {
  try {
    const updatedTransaction =
      await transactionsInventoryModel.findByIdAndUpdate(
        transactionId,
        updateData,
        { new: true }
      );
    return updatedTransaction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTransactionInventory = async (transactionId) => {
  try {
    await transactionsInventoryModel.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTransactionInventory,
  getAllTransactionsInventory,
  updateTransactionInventory,
  deleteTransactionInventory
}