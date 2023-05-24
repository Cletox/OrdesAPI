const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const creditsSchema = new Schema({
  _id: { type: String, required: true },
  clientId: { type: String, unique: true },
  placeId: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const creditsModel = mongoose.model("credits", creditsSchema);

module.exports = {
  creditsModel,
};
