import { Reducer } from "redux";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

// Actions and types
import { ContractAction } from "../actions";
import * as t from "../types";

interface ContractState {
  tezos: TezosToolkit | null;
  kUSDContract: WalletContract | null;
  seedContract: WalletContract | null;
  boxFruitContract: WalletContract | null;
  boxPoolContract: WalletContract | null;
  boxFarmContract: WalletContract | null;
  kUSDFaucetContract: WalletContract | null;
}

const initialState: ContractState = {
  tezos: null,
  kUSDContract: null,
  seedContract: null,
  boxFruitContract: null,
  boxPoolContract: null,
  boxFarmContract: null,
  kUSDFaucetContract: null,
};

export const contractReducer: Reducer<ContractState, ContractAction> = (
  state = initialState,
  action
): ContractState => {
  switch (action.type) {
    case t.ContractActionTypes.LOAD_CONTRACTS: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
