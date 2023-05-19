const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storageSchema = new Schema({
    _id: {type: String, required: true},
    placeId: {type: String, required: true},
    name: {type: String, required: true},
        });


    const storageModel = mongoose.model('storage', storageSchema); //"storage" mongo-collection

    module.exports ={
        storageModel
    };
