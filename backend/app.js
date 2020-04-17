const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const db = require("./db");

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
db.initDb(function handleDatabaseInit(error, db) {
  if (error) {
    console.log(error);
  } else {
    console.log("Web API Server successfully initialized.");
    app.listen(3100);
  }
});
