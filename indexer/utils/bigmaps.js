const axios = require("axios");
const global = require("./global");

// Model
const boxModel = require("../models/box");

const updateKey = async (item) => {
  const box = await boxModel.findOne({ key: item.key });

  if (box) {
    box.lastWatered = item.value.last_watered;
    box.timesWatered = item.value.times_watered;
    await box.save();
  } else {
    const newBox = new boxModel({
      key: item.key,
      creator: item.value.creator,
      lastWatered: item.value.last_watered,
      timesWatered: item.value.times_watered,
    });
    await newBox.save();
  }
};

const syncBigMap = async () => {
  const _res = await axios.get(`${global.tzktAPI}/bigmaps/${global.boxesBigMap}/keys`);
  for (const item of _res.data) {
    updateKey(item);
  }
};

const updateBigMap = (updates) => {
  updates.data.forEach((item) => {
    updateKey(item.content);
  });
};

module.exports = {
  syncBigMap,
  updateBigMap,
};
