const mongoose = require("mongoose");

//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const storageSchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  placeId: { type: String, required: true },
  name: { type: String, required: true },
});

const storageModel = mongoose.model("Storage", storageSchema); //"storage" mongo-collection

module.exports = {
  storageModel,
};
