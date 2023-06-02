const mongoose = require("mongoose");
const { providersModel } = require("../db/providersModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
const createProvider = async (storageData) => {
  try {
    const createdProviders = await providersModel.create(storageData);
    return createdProviders;
  } catch (error) {
    throw new Error("Failed to create provider");
  }
};

const getAllProviders = async () => {
  try {
    const providers = await providersModel.find();
    return providers;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProvider = async (providerId, updateData) => {
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

const deleteProvider = async (providerId) => {
  try {
    await providersModel.findByIdAndDelete(providerId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  updateProvider,
  deleteProvider
}