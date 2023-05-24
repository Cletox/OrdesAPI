const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ordersBuySchema = new Schema({
  _id: { type: String, required: true },
  productList: [{ type: String, required: true, ref: "products" }],
  providerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ordersBuyModel = mongoose.model("ordersBuy", ordersBuySchema);

module.exports = {
  ordersBuyModel,
};
