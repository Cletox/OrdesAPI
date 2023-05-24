const mongoose = require("mongoose");
const { transactionsModel } = require("../db/transactionsModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createTransaction = async (transactionData) => {
  try {
    const createdTransaction = await transactionsModel.create(transactionData);
    return createdTransaction;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
};

exports.getAllTransactions = async () => {
  try {
    const transactions = await transactionsModel.find();
    return transactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateTransaction = async (transactionId, updateData) => {
  try {
    const updatedTransaction = await transactionsModel.findByIdAndUpdate(
      transactionId,
      updateData,
      { new: true }
    );
    return updatedTransaction;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTransaction = async (transactionId) => {
  try {
    await transactionsModel.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};
