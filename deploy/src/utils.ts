import { TezosToolkit } from "@taquito/taquito";
import fs = require("fs");

export const loadFile = (filename: string): string => {
  const file = fs.readFileSync(filename).toString();
  return file;
};

export const deployContract = async (code: string, storage: string, tezos: TezosToolkit): Promise<string> => {
  try {
    const originOp = await tezos.contract.originate({
      code: code,
      init: storage,
    });

    await originOp.confirmation(1);
    return originOp.contractAddress as string;
  } catch (err) {
    throw err;
  }
};
