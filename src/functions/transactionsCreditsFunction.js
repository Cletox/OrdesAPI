const mongoose = require("mongoose");
const { transactionsCreditsModel } = require("../db/transactionsCreditsModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createTransactionCredit = async (transactionData) => {
  try {
    const createdTransaction = await transactionsCreditsModel.create(
      transactionData
    );
    return createdTransaction;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
};

exports.getAllTransactionsCredits = async () => {
  try {
    const transactions = await transactionsCreditsModel.find();
    return transactions;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateTransactionCredit = async (transactionId, updateData) => {
  try {
    const updatedTransaction = await transactionsCreditsModel.findByIdAndUpdate(
      transactionId,
      updateData,
      { new: true }
    );
    return updatedTransaction;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTransactionCredit = async (transactionId) => {
  try {
    await transactionsCreditsModel.findByIdAndDelete(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};
