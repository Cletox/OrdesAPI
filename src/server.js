const express = require("express");
const app = express();
const router = require("../src/routes/router");
const { connectToDataBase} = require("./config/connection");
require("dotenv").config();
app.use(express.json());
app.use(router);

connectToDataBase();


//Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
