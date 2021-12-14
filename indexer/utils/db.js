const mongoose = require("mongoose");
const global = require("./global");

module.exports = {
  connectDB: () => {
    mongoose.connect(global.mongodbURL).then(() => {
      console.log(">> MongoDB connected");
    });
  },
};
