const signalR = require("@microsoft/signalr");
const global = require("./global");

const connection = new signalR.HubConnectionBuilder().withUrl(`${global.tzktAPI}/events`).build();

const init = async () => {
  // open connection
  await connection.start();

  // Subscribe to BigMap changes
  await connection.invoke("SubscribeToBigMaps", {
    ptr: 24386,
  });
};

module.exports = {
  init,
  connection,
};
