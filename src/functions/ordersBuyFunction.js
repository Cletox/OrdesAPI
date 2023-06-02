const mongoose = require("mongoose");
const { ordersBuyModel } = require("../db/ordersBuyModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createOrderBuy = async (orderData) => {
  try {
    const createdOrder = await ordersBuyModel.create(orderData);
    return createdOrder;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

const getAllOrdersBuy = async () => {
  try {
    const orders = await ordersBuyModel.find();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderBuy = async (orderId, updateData) => {
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

const deleteOrderBuy = async (orderId) => {
  try {
    await ordersBuyModel.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createOrderBuy,
  getAllOrdersBuy,
  updateOrderBuy,
  deleteOrderBuy
}