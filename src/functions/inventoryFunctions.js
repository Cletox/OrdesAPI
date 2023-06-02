const mongoose = require("mongoose");
const { inventoryModel } = require("../db/inventoryModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
const createInventory = async (storageData) => {
  try {
    const createdInventory = await inventoryModel.create(storageData);
    return createdInventory;
  } catch (error) {
    throw new Error("Failed to create storage");
  }
};

const getAllInventory = async () => {
  try {
    const inventory = await inventoryModel.find();
    return inventory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateInventory = async (inventoryId, updateData) => {
  try {
    const updatedInventory = await inventoryModel.findByIdAndUpdate(
      inventoryId,
      updateData,
      { new: true }
    );
    return updatedInventory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteInventory = async (inventoryId) => {
  try {
    await inventoryModel.findByIdAndDelete(inventoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  updateInventory,
  deleteInventory
}
