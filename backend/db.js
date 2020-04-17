const { MongoClient } = require("mongodb");

require("dotenv").config({
  path: "./config/config.env",
});

const { MONGO_URI } = process.env;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is already initialized.");
    return callback(null, _db);
  }

  MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  })
    .then(function connectMongoClient(client) {
      _db = client;
      console.log("Database successfully initialized.");
      callback(null, _db);
    })
    .catch(function catchErrorMongoClient(error) {
      callback(error);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database is not initialized.");
  }
  return _db;
};

module.exports = { initDb, getDb };
