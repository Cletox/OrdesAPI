const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsCreditsSchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  clientId: { type: String, unique: true },
  placeId: { type: String, required: true },
  add: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const transactionsCreditsModel = mongoose.model(  "transactionsCredits",  transactionsCreditsSchema);

module.exports = {
  transactionsCreditsModel,
};
