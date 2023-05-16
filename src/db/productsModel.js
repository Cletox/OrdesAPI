const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {type: String, required: true},
  model: {type: String, required: true},
  brand: {type: String, required: true},
  categoryId: {type: mongoose.Types.ObjectId, required: true, ref: "category"},
  });


const clientSchema  = new Schema({
    name: {type: String, required: true},
    nid: {type: String, required: true},
    phone: {type: String, required: true}
  });


  const itemQtySchema = new Schema({
        qty: {type: number, required: true},
        productId: {type: mongoose.Types.ObjectId, required: true},
        ref: 'productsSchema'   
  });
  
  const orderSchema  = new Schema({
      orderNo: {type: String, required: true},
    clientId: {type: mongoose.Types.ObjectId, required: true}, 
    orderItems : [itemQtySchema]
  });

  const categorySchema  = new Schema({
        name: {type: String, required: true}, //exam: desktop, portatil, phones,peripherals, etc
      });

      const productModel = mongoose.model('Product', productsSchema);
      const clientModel = mongoose.model('Client', clientSchema);
      const itemQtyModel = mongoose.model('ItemQty', itemQtySchema);
      const orderModel = mongoose.model('Order', orderSchema);
      const categoryModel = mongoose.model('Category', categorySchema);
      
      module.exports = {
        productModel,
        clientModel,
        itemQtyModel,
        orderModel,
        categoryModel
      };