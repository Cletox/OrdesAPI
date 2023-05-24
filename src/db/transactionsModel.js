const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  _id: { type: String, required: true },
  placeId: { type: String, required: true },
  category_transactionsId: { type: String, required: true },
  value: { type: Number, required: true },
  add: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = {
  transactionsModel,
};
