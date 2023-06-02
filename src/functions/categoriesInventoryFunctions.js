const mongoose = require("mongoose");
const { categoriesInventoryModel } = require("../db/categoriesInventoryModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new product
const createCategoriesInventory = async (categoriesInventoryData) => {
  try {
    const createdcategoriesInventory = await categoriesInventoryModel.create(
      categoriesInventoryData
    );
    return createdcategoriesInventory;
  } catch (error) {
    throw new Error("Failed to create categories Inventory");
  }
};

const getAllCategoriesInventory = async () => {
  try {
    const categoriesInventory = await categoriesInventoryModel.find();
    return categoriesInventory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoriesInventory = async (storageId, updateData) => {
  try {
    const updatedCategoriesInventory =
      await categoriesInventoryModel.findByIdAndUpdate(storageId, updateData, {
        new: true,
      });
    return updatedCategoriesInventory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategoriesInventory = async (categoriesInventoryId) => {
  try {
    await categoriesInventoryModel.findByIdAndDelete(categoriesInventoryId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCategoriesInventory,
  getAllCategoriesInventory,
  updateCategoriesInventory,
  deleteCategoriesInventory
}