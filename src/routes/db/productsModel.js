const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  //_id: { type: mongoose.Types.ObjectId, required: true },
  name: String,
  model: String,
  brand: String,
  categoryId: String,
  });


const clientSchema  = new Schema({
    //_id: { type: mongoose.Types.ObjectId, required: true },
    name: String,
    nid: String,
    phone, String
  });


  const itemQty = new Schema({
          
        productId: Schema.Types.ObjectId,
        ref: 'productsSchema' 
          

  });
  
  const orderSchema  = new Schema({
    //_id: { type: mongoose.Types.ObjectId, required: true },
    orderno: string,
    clientId: Schema.Types.ObjectId, 
    orderItems : [itemQty]

  });

  const categorySchema  = new Schema({
    //_id: { type: mongoose.Types.ObjectId, required: true },
    name: String,
      });



module.exports = mongoose.model('detailProducts', productsSchema);