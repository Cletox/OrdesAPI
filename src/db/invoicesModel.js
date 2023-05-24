const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoicesSchema = new Schema({
  placeId: { type: String, required: true },
  clientId: { type: String, required: true },
  tax_profileId: { type: String, required: true },
  invoice: { type: Schema.Types.Mixed, required: true },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const invoicesModel = mongoose.model("invoices", invoicesSchema);

module.exports = {
  invoicesModel,
};
