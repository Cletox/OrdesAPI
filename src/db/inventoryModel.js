const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  productInventory: { type: String, required: true, unique: true },
  quanty: { type: Number, required: true },
  quantyMin: { type: Number, required: true },
  storageId: { type: String, required: true },
  placeId: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true },
  upadteAt: { type: Date, default: Date.now, required: true },
});

const inventoryModel = mongoose.model("inventory", inventorySchema); //"inventory" mongo-collection

module.exports = {
  inventoryModel,
};
