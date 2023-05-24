const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsInventorySchema = new Schema({
  _id: { type: String, required: true },
  productId: { type: String, unique: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  add: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const transactionsInventoryModel = mongoose.model(
  "transactionsInventory",
  transactionsInventorySchema
);

module.exports = {
  transactionsInventoryModel,
};
