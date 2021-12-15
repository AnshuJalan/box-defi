import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

// Types and utlities
import { deploy, DeployParams } from "./deploy";

const Tezos = new TezosToolkit(`https://${process.argv[2]}.smartpy.io`);

Tezos.setProvider({
  signer: new InMemorySigner(process.env.PRIVATE_KEY as string),
});

// Admin address of the contract
const ADMIN = "tz1ZczbHu1iLWRa88n9CUiCKDGex5ticp19S";

// Flash loan fee for pool
const FLASH_LOAN_FEE = 100;

// Seed tokens to plant in every box
const SEEDS_PER_BOX = 10 * 10 ** 18;

// Minimum watering interval in seconds
const WATER_PERIOD = 300;

// Minimum number of watering required before harvesting
const WATER_TO_HARVEST = 5;

const deployParams: DeployParams = {
  admin: ADMIN,
  tezos: Tezos,
  poolContract: {
    flashLoanFee: FLASH_LOAN_FEE,
  },
  farmContract: {
    seedsPerBox: SEEDS_PER_BOX,
    waterPeriod: WATER_PERIOD,
    waterToHarvest: WATER_TO_HARVEST,
  },
};

void deploy(deployParams);
