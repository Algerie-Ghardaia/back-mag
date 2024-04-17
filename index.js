require("dotenv").config();
const express = require("express");


const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

try {
  mongoose.connect("mongodb://localhost:27017/Alimentaire");
} catch (error) {
  console.log("Error connecting to mongodb", error);
}

//----------------IMPORT ROUTES------------------//
const userRoutes = require("./models/User");
const orderRoutes = require("./models/Order");
app.use(userRoutes);
app.use(orderRoutes);
//-----------------------------------------------//
app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3001, () => {
  console.log("Serveur on fire 🔥🔥🔥🔥🔥🔥");
});
