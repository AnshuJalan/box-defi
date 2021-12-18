// ENV
export const rpcNode = process.env.REACT_APP_RPC_NODE || "https://hangzhounet.api.tez.ie/";
export const network = process.env.REACT_APP_NETWORK || "hangzhounet";
export const explorerURL = process.env.REACT_APP_EXPLORER_URL || "https://hangzhou2net.tzkt.io";
export const apiURL = process.env.REACT_APP_API_URL || "https://api.hangzhou2net.tzkt.io/v1";
export const indexerAPI = process.env.REACT_APP_INDEXER_API || "http://localhost:3001";
export const kUSDAddress = process.env.REACT_APP_KUSD_ADDRESS || "KT1Wm5fogUZU2TVc6WGXZptuMDCvz6hi9N7V";
export const seedAddress = process.env.REACT_APP_SEED_ADDRESS || "KT1HGNudtKV1XGQGruPt3in2USu7pSUzjf13";
export const boxFruitAddress = process.env.REACT_APP_BOX_FRUIT_ADDRESS || "KT1MBELr7iVwZRx58LqCvQQp3YCnPb7RTqWM";
export const boxPoolAddress = process.env.REACT_APP_BOX_POOL_ADDRESS || "KT1EqdGnZ4eUZFbgcUUuebC8w4zq9QMrkfTa";
export const boxFarmAddress = process.env.REACT_APP_BOX_FARM_ADDRESS || "KT19QzTze2PdBfwUcQNugZMvAmbneAawCjQ4";
export const kUSDFaucetAddress = process.env.REACT_APP_KUSD_FAUCET_ADDRESS || "KT1G2a32hJHhvoM3j629fCoLmwU3H7NrH9Rd";

// General constants
export const seedsPerBox = 10 * 10 ** 18;
export const waterPeriod = 300 * 1000; // Milliseconds

// Fruits enum
export enum Fruits {
  ELDER_GRAPE = "ELDER_GRAPE",
  MANGROT = "MANGROT",
  SPOT_BERRY = "SPOT_BERRY",
  BLUE_STRIPE = "BLUE_STRIPE",
  CROWN_APPLE = "CROWN_APPLE",
}
