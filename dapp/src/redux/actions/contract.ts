import { TezosToolkit, WalletContract } from "@taquito/taquito";
import * as t from "../types";

export interface LoadContractsAction {
  type: t.ContractActionTypes.LOAD_CONTRACTS;
  payload: {
    tezos: TezosToolkit;
    kUSDContract: WalletContract;
    seedContract: WalletContract;
    boxFruitContract: WalletContract;
    boxPoolContract: WalletContract;
    boxFarmContract: WalletContract;
    kUSDFaucetContract: WalletContract;
  };
}
