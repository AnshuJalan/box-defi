const signalR = require("@microsoft/signalr");
const global = require("./global");
const BigMaps = require("./bigmaps");

const connection = new signalR.HubConnectionBuilder().withUrl(`${global.tzktAPI}/events`).build();

const init = async () => {
  try {
    // open connection
    await connection.start();

    // Subscribe to BigMap changes
    await connection.invoke("SubscribeToBigMaps", {
      ptr: global.boxesBigMap,
    });
  } catch (err) {
    // Attempt reconnection
    setTimeout(attemptReconnection, 10000);
  }
};

// TODO: make this more efficient
const attemptReconnection = async () => {
  if (connection.state !== "Connected") await init();
  // Sync bigMaps
  await BigMaps.syncBigMap();
};

module.exports = {
  init,
  connection,
};
