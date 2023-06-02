const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "category",
  },
});

const clientSchema = new Schema({
  name: { type: String, required: true },
  nid: { type: String, required: true },
  phone: { type: String, required: true },
});

const itemQtySchema = new Schema({
  qty: { type: Number, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true,
  ref: "products",
}
});

const orderSchema = new Schema({
  orderNo: { type: String, required: true },
  clientId: { type: mongoose.Types.ObjectId, required: true },
  orderItems: [itemQtySchema],
});

const categorySchema = new Schema({
  name: { type: String, required: true }, //exam: desktop, portatil, phones,peripherals, etc
});

const Product = mongoose.model("Product", productsSchema);
const Client = mongoose.model("Client", clientSchema);
const ItemQty = mongoose.model("ItemQty", itemQtySchema);
const Order = mongoose.model("Order", orderSchema);
const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Product,
  Client,
  ItemQty,
  Order,
  Category
};
