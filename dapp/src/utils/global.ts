// ENV
export const rpcNode = process.env.REACT_APP_RPC_NODE || "https://hangzhounet.smartpy.io";
export const network = process.env.REACT_APP_NETWORK || "hangzhounet";
export const explorerURL = process.env.REACT_APP_EXPLORER_URL || "https://hangzhou2net.tzkt.io";
export const apiURL = process.env.REACT_APP_API_URL || "https://api.hangzhou2net.tzkt.io/v1";
export const indexerAPI = process.env.REACT_APP_INDEXER_API || "http://localhost:3001";
export const kUSDAddress = process.env.REACT_APP_KUSD_ADDRESS || "KT1E1ZMRMfMrbWxa2YT9F9PBoV6kGhhYgWm1";
export const seedAddress = process.env.REACT_APP_SEED_ADDRESS || "KT1Pam4c6KYy3SSxF9k3BGD4z6oeN7WocWBe";
export const boxFruitAddress = process.env.REACT_APP_BOX_FRUIT_ADDRESS || "KT1HCjkhZE3WoXo1aZtxtwwLyUeM9T5WKSTK";
export const boxPoolAddress = process.env.REACT_APP_BOX_POOL_ADDRESS || "KT1Vh6uGr1aRxj9HeNKJT9m9jtii1JVymk7L";
export const boxFarmAddress = process.env.REACT_APP_BOX_FARM_ADDRESS || "KT1F6BUnDzdzGiuVe3kzGnLt2serQDg4WQBN";

// General constants
export const seedsPerBox = 10 * 10 ** 18;
export const waterPeriod = 300 * 1000; // Milliseconds
