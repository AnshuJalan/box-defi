const mongoose = require("mongoose");

const boxModel = mongoose.Schema({
  key: String,
  creator: String,
  lastWatered: String,
  timesWatered: String,
});

module.exports = mongoose.model("box", boxModel);
