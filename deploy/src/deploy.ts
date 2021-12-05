import { TezosToolkit, ParamsWithKind, OpKind } from "@taquito/taquito";
import { loadFile, deployContract } from "./utils";

export type DeployParams = {
  // Admin address
  admin: string;

  // Pool contrac storage
  poolContract: {
    flashLoanFee: number;
  };

  // Farm contract storage
  farmContract: {
    seedsPerBox: number;
    waterPeriod: number;
    waterToHarvest: number;
  };

  // TezosToolkitInstance instance
  tezos: TezosToolkit;
};

export const deploy = async (deployParams: DeployParams) => {
  // FA1.2 storage and code (Seed token, Pool token)
  const fa12Storage = `(Pair (Pair "${deployParams.admin}" {}) (Pair False 0))`;
  const fa12Code = loadFile(`${__dirname}/../../contracts/michelson/fa12.tz`);

  // FA2 storage and code (Box Fruit token)
  const fa2Storage = `(Pair (Pair "${deployParams.admin}" (Pair {} {Elt "" 0x697066733a2f2f516d5651324152724b39754a5532425631794b4367485a5064574b5745354533455033504276587657794b745a4b})) (Pair {} (Pair {} {})))`;
  const fa2Code = loadFile(`${__dirname}/../../contracts/michelson/box_fruit_fa2.tz`);

  console.log("---------------------------------------");
  console.log(" Deploying Box DeFi Contracts");
  console.log("---------------------------------------");

  // Deploy Seed token
  console.log("\n>> [1 / 5] Deploying FA1.2 Seed Token");
  const seedTokenAddress = await deployContract(fa12Code, fa12Storage, deployParams.tezos);
  console.log(">> Seed Token address: ", seedTokenAddress);

  // Deploy Pool token
  console.log("\n>> [2 / 5] Deploying FA1.2 Pool Token");
  const poolTokenAddress = await deployContract(fa12Code, fa12Storage, deployParams.tezos);
  console.log(">> Pool Token address: ", poolTokenAddress);

  // Deploy Box Fruit FA2 token
  console.log("\n>> [3 / 5] Deploying FA2 Box Fruit Token");
  const boxFruitFa2Address = await deployContract(fa2Code, fa2Storage, deployParams.tezos);
  console.log(">> Box Fruit Token address: ", boxFruitFa2Address);

  // Pool contract Storage and code
  const boxPoolStorage = `(Pair "${deployParams.admin}" (Pair ${deployParams.poolContract.flashLoanFee} (Pair "${seedTokenAddress}" (Pair 0 (Pair "${poolTokenAddress}" None)))))`;
  const boxPoolCode = loadFile(`${__dirname}/../../contracts/michelson/box_pool.tz`);

  // Deploy Pool contract
  console.log("\n>> [4 / 5] Deploying Box Pool Contract");
  const boxPoolAddress = await deployContract(boxPoolCode, boxPoolStorage, deployParams.tezos);
  console.log(">> Box Pool address: ", boxPoolAddress);

  // Farm contract storage and code
  const boxFarmStorage = `(Pair (Pair (Pair "${deployParams.admin}" "${boxFruitFa2Address}") (Pair {} (Pair {} 0))) (Pair (Pair {} (Pair "${seedTokenAddress}" ${deployParams.farmContract.seedsPerBox})) (Pair 0 (Pair ${deployParams.farmContract.waterPeriod} ${deployParams.farmContract.waterToHarvest}))))`;
  const boxFarmCode = loadFile(`${__dirname}/../../contracts/michelson/box_farm.tz`);

  console.log("\n>> [5 / 5] Deploying Box Farm Contract");
  const boxFarmAddress = await deployContract(boxFarmCode, boxFarmStorage, deployParams.tezos);
  console.log(">> Box Farm address: ", boxFarmAddress);

  console.log("\n\n---------------------------------------");
  console.log(" Configuring admins and fruit metadata");
  console.log("---------------------------------------");

  // Contract instances
  const boxFruitInstance = await deployParams.tezos.contract.at(boxFruitFa2Address);
  const seedInstance = await deployParams.tezos.contract.at(seedTokenAddress);
  const boxFarmInstance = await deployParams.tezos.contract.at(boxFarmAddress);

  // Merge pattern params type
  type MergeParams = { token_id: number; tokens: { token_id: number; amount: number }[] }[];
  const mergeParams: MergeParams = [
    {
      token_id: 2,
      tokens: [{ token_id: 1, amount: 4 }],
    },
    {
      token_id: 3,
      tokens: [
        { token_id: 1, amount: 3 },
        { token_id: 2, amount: 3 },
      ],
    },
    {
      token_id: 4,
      tokens: [
        { token_id: 1, amount: 2 },
        { token_id: 2, amount: 2 },
        { token_id: 3, amount: 2 },
      ],
    },
    {
      token_id: 5,
      tokens: [
        { token_id: 1, amount: 1 },
        { token_id: 2, amount: 1 },
        { token_id: 3, amount: 1 },
        { token_id: 4, amount: 1 },
      ],
    },
  ];

  const rarityList: { token_id: number; index: number }[] = [
    { token_id: 1, index: 50 },
    { token_id: 2, index: 90 },
    { token_id: 3, index: 120 },
    { token_id: 4, index: 140 },
    { token_id: 5, index: 150 },
  ];

  const tokens: { token_id: number; metadata: string }[] = [
    {
      token_id: 1,
      metadata:
        "697066733a2f2f516d52416f61384d77504e74724247664b6b505953376752365771766a767a74584a585864526763696f506e3973",
    },
    {
      token_id: 2,
      metadata:
        "697066733a2f2f516d53566f4732474566317751413743486368525a6d6f6e476f363546436e4e376f32554b315647647942664257",
    },
    {
      token_id: 3,
      metadata:
        "697066733a2f2f516d584d4b46356132696677546e68735a7a65684d6d33643179637a54336d74344142656b4135366d4557386356",
    },
    {
      token_id: 4,
      metadata:
        "697066733a2f2f516d55324838376b35486b666673463258766663435575375155446e366e62546f336f3157485436625955715837",
    },
    {
      token_id: 5,
      metadata:
        "697066733a2f2f516d58707446565739765267684e324d7932614d3371465a677a3855346d4a665138394b5a4d427a666e54645045",
    },
  ];

  // Batch operation list
  const opList: ParamsWithKind[] = [
    {
      kind: OpKind.TRANSACTION,
      ...seedInstance.methods.setAdministrator(boxPoolAddress).toTransferParams(),
    },
    {
      kind: OpKind.TRANSACTION,
      ...boxFruitInstance.methods.set_admin(boxFarmAddress).toTransferParams(),
    },
    {
      kind: OpKind.TRANSACTION,
      ...boxFarmInstance.methods.add_merge_patterns(mergeParams).toTransferParams(),
    },
    {
      kind: OpKind.TRANSACTION,
      ...boxFarmInstance.methods.add_fruits(rarityList, tokens).toTransferParams(),
    },
  ];

  const batch = deployParams.tezos.contract.batch(opList);
  const batchOp = await batch.send();
  await batchOp.confirmation(1);

  console.log(">> Configured admin and metadata: ", batchOp.hash);

  console.log("\n---------------------------------------");
  console.log(" Deployment Complete");
  console.log("---------------------------------------");
};
