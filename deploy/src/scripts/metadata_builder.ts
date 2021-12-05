import { create } from "ipfs-http-client";

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const ARTIFACTS = [
  {
    uri: "ipfs://QmW3a6DjufEr39HkyGpC3aECK3QP5CuvEZdG6578Fq4xLd",
    name: "BF #1 - Elder Grape",
  },
  {
    uri: "ipfs://QmU1fpW53pThaBmTzgxeUntDnwen4MUS7NXqZGNDzTUQDJ",
    name: "BF #2 - Mangrot",
  },
  {
    uri: "ipfs://QmUdzpwNXZpMnjh58D3ois4miyp22zaJUdTpJ4hVs5ZAyE",
    name: "BF #3 - Spot Berry",
  },
  {
    uri: "ipfs://Qmd6e1XVnM31PuxS7PYe7cBY6sRFKiv2mnzuRbzLNbCZo3",
    name: "BF #4 - Blue Stripe",
  },
  {
    uri: "ipfs://QmQqyE8nfZuhSx4ww279VrMXrXt4PeYt4PuG9ofpWfMbqE",
    name: "BF #5 - Crown Apple",
  },
];

(async () => {
  for (const artifact of ARTIFACTS) {
    const metadata = {
      artifactUri: artifact.uri,
      displayUri: artifact.uri,
      thumbnailUri: artifact.uri,
      decimals: 0,
      symbol: "FRUIT",
      name: artifact.name,
    };
    const { cid } = await ipfs.add(JSON.stringify(metadata));
    console.log(Buffer.from(`ipfs://${cid.toString()}`).toString("hex"));
  }
})();
