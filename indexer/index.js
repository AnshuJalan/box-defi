const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const tzkt = require("./utils/tzkt");
const BigMaps = require("./utils/bigmaps");
const global = require("./utils/global");

require("dotenv").config();

// Routes
const boxRoutes = require("./routes/boxes");

const app = express();

// auto-reconnect
tzkt.connection.onclose(tzkt.init);

// TzKt connection event
tzkt.connection.on("bigmaps", BigMaps.updateBigMap);

tzkt.init();

// Connect DB
db.connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/boxes", boxRoutes);

app.listen(global.port, async () => {
  console.log(">> Syncing BigMap");
  await BigMaps.syncBigMap();
  console.log(">> BigMap Synced");
  console.log(`>> Listening on port ${global.port}`);
});
