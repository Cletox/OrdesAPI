const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesInventorySchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  placeId: { type: String, required: true },
  name: { type: String, required: true },
  taxProfileId: { type: String, required: true },
});

const categoriesInventoryModel = mongoose.model(  "categoriesInventory",  categoriesInventorySchema); //"storage" mongo-collection

module.exports = {
  categoriesInventoryModel,
};
