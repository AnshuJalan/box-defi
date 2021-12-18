import { ContractMethod, Wallet } from "@taquito/taquito";

// Redux store
import { store } from "..";

export const getTokens = async (): Promise<ContractMethod<Wallet> | undefined> => {
  const { kUSDFaucetContract } = store.getState().contract;

  if (!kUSDFaucetContract) return;

  try {
    const op = await kUSDFaucetContract.methods.default([["Unit"]]);
    return op;
  } catch (err) {
    throw err;
  }
};
