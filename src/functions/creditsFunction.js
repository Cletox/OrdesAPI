const mongoose = require("mongoose");
const { creditsModel } = require("../db/creditsModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createCredit = async (creditData) => {
  try {
    const createdCredit = await creditsModel.create(creditData);
    return createdCredit;
  } catch (error) {
    throw new Error("Failed to create credit");
  }
};

exports.getAllCredits = async () => {
  try {
    const credits = await creditsModel.find();
    return credits;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateCredit = async (creditId, updateData) => {
  try {
    const updatedCredit = await creditsModel.findByIdAndUpdate(
      creditId,
      updateData,
      { new: true }
    );
    return updatedCredit;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteCredit = async (creditId) => {
  try {
    await creditsModel.findByIdAndDelete(creditId);
  } catch (error) {
    throw new Error(error.message);
  }
};
