const mongoose = require("mongoose");
const { storageModel } = require("../db/storageModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
exports.createStorage = async (storageData) => {
  try {
    const createdStorage = await storageModel.create(storageData);
    return createdStorage;
  } catch (error) {
    throw new Error("Failed to create storage");
  }
};

exports.getAllStorage = async () => {
  try {
    const storages = await storageModel.find();
    return storages;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateStorage = async (storageId, updateData) => {
  try {
    const updatedStorage = await storageModel.findByIdAndUpdate(
      storageId,
      updateData,
      { new: true }
    );
    return updatedStorage;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteStorage = async (storageId) => {
  try {
    await storageModel.findByIdAndDelete(storageId);
  } catch (error) {
    throw new Error(error.message);
  }
};
