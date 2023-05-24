const mongoose = require("mongoose");
const {
  transactionsInventoryModel,
} = require("../db/transactionsInventoryModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createTransactionInventory = async (transactionData) => {
  try {
    const createdTransaction = await transactionsInventoryModel.create(
      transactionData
    );
    return createdTransaction;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
};

exports.getAllTransactionsInventory = async () => {
  try {
    const transactions = await transactionsInventoryModel.find();
    return transactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateTransactionInventory = async (transactionId, updateData) => {
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

exports.deleteTransactionInventory = async (transactionId) => {
  try {
    await transactionsInventoryModel.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};
