const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

require("dotenv").config({
  path: "./config/config.env",
});

const { MONGO_URI } = process.env;

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

MongoClient.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(function connectMongoClient(client) {
    console.log("Connected to the MongoDB cluster.");
    client.close();
  })
  .catch(function catchErrorMongoClient(error) {
    console.log(error);
  });

app.listen(3100);
