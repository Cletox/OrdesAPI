const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoicesSchema = new Schema({
  placeId: { type: String, required: true },
  clientId: { type: String, required: true },
  taxProfileId: { type: String, required: true },
  invoice: { type: Schema.Types.Mixed, required: true },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const invoicesModel = mongoose.model("Invoices", invoicesSchema);

module.exports = {
  invoicesModel,
};
