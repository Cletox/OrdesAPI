const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsInventorySchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: String, unique: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true , default: Date.now},
  add: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const transactionsInventoryModel = mongoose.model(  "transactionsInventory",  transactionsInventorySchema);

module.exports = {
  transactionsInventoryModel,
};
