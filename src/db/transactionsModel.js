const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  placeId: { type: String, required: true },
  categoryTransactionsId: { type: String, required: true },
  value: { type: Number, required: true },
  add: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = {
  transactionsModel,
};
