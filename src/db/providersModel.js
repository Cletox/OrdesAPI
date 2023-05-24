const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
  _id: { type: String, required: true },
  nameCompany: { type: String, required: true },
  email: { type: String, required: true },
  phonesArray: [{ type: String, required: true }],
  nameContact: { type: String, required: true },
  direction: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const providersModel = mongoose.model("provider", ProviderSchema); //"storage" mongo-collection

module.exports = {
  providersModel,
};
