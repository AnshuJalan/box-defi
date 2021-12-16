// ENV
export const rpcNode = process.env.REACT_APP_RPC_NODE || "https://hangzhounet.api.tez.ie/";
export const network = process.env.REACT_APP_NETWORK || "hangzhounet";
export const explorerURL = process.env.REACT_APP_EXPLORER_URL || "https://hangzhou2net.tzkt.io";
export const apiURL = process.env.REACT_APP_API_URL || "https://api.hangzhou2net.tzkt.io/v1";
export const indexerAPI = process.env.REACT_APP_INDEXER_API || "http://localhost:3001";
export const kUSDAddress = process.env.REACT_APP_KUSD_ADDRESS || "KT1BPBMMT9TUBbGC5JkRP3S43PfWqEyqopru";
export const seedAddress = process.env.REACT_APP_SEED_ADDRESS || "KT1WYoo5dSoMhQcRmUxvvk7xfcMJUquxtJu6";
export const boxFruitAddress = process.env.REACT_APP_BOX_FRUIT_ADDRESS || "KT1V28PWV6EKM9sDd7eRAs1PtKL7coRXwnNu";
export const boxPoolAddress = process.env.REACT_APP_BOX_POOL_ADDRESS || "KT1UvWtYRcET4qY7NjBu7djx69ShdCNnoqV1";
export const boxFarmAddress = process.env.REACT_APP_BOX_FARM_ADDRESS || "KT19crjHXVFGJz4KNbdbZ9q7XH8UnLbtJwLj";

// General constants
export const seedsPerBox = 10 * 10 ** 18;
export const waterPeriod = 300 * 1000; // Milliseconds
