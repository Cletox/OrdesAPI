const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoryTransactionsSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const categoryTransactionsModel = mongoose.model(
  "categoryTransactions",
  categoryTransactionsSchema
);

module.exports = {
  categoryTransactionsModel,
};
