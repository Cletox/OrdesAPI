const mongoose = require("mongoose");
const { ordersBuyModel } = require("../db/ordersBuyModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createOrderBuy = async (orderData) => {
  try {
    const createdOrder = await ordersBuyModel.create(orderData);
    return createdOrder;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

exports.getAllOrdersBuy = async () => {
  try {
    const orders = await ordersBuyModel.find();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateOrderBuy = async (orderId, updateData) => {
  try {
    const updatedOrder = await ordersBuyModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteOrderBuy = async (orderId) => {
  try {
    await ordersBuyModel.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error(error.message);
  }
};
