module.exports = {
  tzktAPI: process.env.TZKT_API || "https://api.hangzhou2net.tzkt.io/v1",
  boxesBigMap: process.env.BOXES_BIGMAP || 24386,
  port: process.env.PORT || 3001,
  mongodbURL: process.env.MONGODB_URL || "mongodb://localhost:27017/box-defi",
};
