const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("../routes/router");
const { MongoClient } = require("mongodb");
require("dotenv").config();
app.use(express.json());

 function connectToDataBase(req, res) {
  
  const uri =
    process.env.NODE_ENV === "prod"
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_LOCAL;
  
     mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=>console.log('success connection to database'))
    .catch((err)=>console.log(err));
  
}

module.exports = {
  connectToDataBase
};
