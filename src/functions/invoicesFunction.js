const mongoose = require("mongoose");
const { invoicesModel } = require("../db/invoicesModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createInvoice = async (invoiceData) => {
  try {
    const createdInvoice = await invoicesModel.create(invoiceData);
    return createdInvoice;
  } catch (error) {
    throw new Error("Failed to create invoice");
  }
};

exports.getAllInvoices = async () => {
  try {
    const invoices = await invoicesModel.find();
    return invoices;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateInvoice = async (invoiceId, updateData) => {
  try {
    const updatedInvoice = await invoicesModel.findByIdAndUpdate(
      invoiceId,
      updateData,
      { new: true }
    );
    return updatedInvoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteInvoice = async (invoiceId) => {
  try {
    await invoicesModel.findByIdAndDelete(invoiceId);
  } catch (error) {
    throw new Error(error.message);
  }
};
