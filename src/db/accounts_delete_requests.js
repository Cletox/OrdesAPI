const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: { type: String, required: true },
});

const Account = mongoose.model("accounts_delete_requests", accountSchema); //"storage" mongo-collection
module.exports = {
  Account,
};
