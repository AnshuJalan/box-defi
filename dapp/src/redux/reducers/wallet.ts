import { Reducer } from "redux";
import { BeaconWallet } from "@taquito/beacon-wallet";

// Utils
import { Fruits } from "../../utils/global";

// Actions and types
import { WalletAction } from "../actions";
import * as t from "../types";

interface WalletState {
  isConnected: boolean;
  walletInstance: BeaconWallet | null;
  accountPkh: string;
  tokenBalances: {
    kUSD: string;
    SEED: string;
  };
  fruitBalances: {
    [key in keyof typeof Fruits]: string;
  };
}

const initialState: WalletState = {
  isConnected: false,
  walletInstance: null,
  accountPkh: "",
  tokenBalances: {
    kUSD: "0",
    SEED: "0",
  },
  fruitBalances: {
    [Fruits.ELDER_GRAPE]: "0",
    [Fruits.MANGROT]: "0",
    [Fruits.SPOT_BERRY]: "0",
    [Fruits.BLUE_STRIPE]: "0",
    [Fruits.CROWN_APPLE]: "0",
  },
};

export const walletReducer: Reducer<WalletState, WalletAction> = (state = initialState, action): WalletState => {
  switch (action.type) {
    case t.WalletActionTypes.CONNECT_WALLET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case t.WalletActionTypes.GET_BALANCES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
