const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const route = require("./routes/route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(4000);
    console.log("Connect to database");
  })
  .catch((err) => {
    console.log(err);
  });
