const axios = require("axios");
const global = require("./global");

// Model
const boxModel = require("../models/box");

const updateKey = async (item) => {
  if (item.action !== "remove_key") {
    const box = await boxModel.findOne({ key: item.content.key });
    if (box) {
      box.lastWatered = item.content.value.last_watered;
      box.timesWatered = item.content.value.times_watered;
      await box.save();
    } else {
      const newBox = new boxModel({
        key: item.content.key,
        creator: item.content.value.creator,
        lastWatered: item.content.value.last_watered,
        timesWatered: item.content.value.times_watered,
      });
      await newBox.save();
    }
  } else {
    await boxModel.findOneAndRemove({ key: item.content.key });
  }
};

const syncBigMap = async () => {
  const _res = await axios.get(`${global.tzktAPI}/bigmaps/updates?bigmap=${global.boxesBigMap}&limit=10000`);
  for (const item of _res.data.slice(1)) {
    await updateKey(item);
  }
};

const updateBigMap = (updates) => {
  for (const item of updates.data) {
    updateKey(item);
  }
};

module.exports = {
  syncBigMap,
  updateBigMap,
};
