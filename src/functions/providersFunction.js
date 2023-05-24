const mongoose = require("mongoose");
const { providersModel } = require("../db/providersModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
exports.createProvider = async (storageData) => {
  try {
    const createdProviders = await providersModel.create(storageData);
    return createdProviders;
  } catch (error) {
    throw new Error("Failed to create provider");
  }
};

exports.getAllProviders = async () => {
  try {
    const providers = await providersModel.find();
    return providers;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProvider = async (providerId, updateData) => {
  try {
    const updatedProvider = await providersModel.findByIdAndUpdate(
      providerId,
      updateData,
      { new: true }
    );
    return updatedProvider;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteProvider = async (providerId) => {
  try {
    await providersModel.findByIdAndDelete(providerId);
  } catch (error) {
    throw new Error(error.message);
  }
};
