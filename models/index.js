const dbConfig = require("../config/dbconfig");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.electricDevice = require('./electronic_device_details.js');(mongoose);

module.exports = db;