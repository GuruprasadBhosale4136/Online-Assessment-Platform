// models/TestLog.js
const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema({
  time: String,
  event: String,
});

const testLogSchema = new mongoose.Schema({
  entryTime: String,
  exitTime: String,
  totalDuration: Number,
  violations: [violationSchema],
});

module.exports = mongoose.model("TestLog", testLogSchema);


