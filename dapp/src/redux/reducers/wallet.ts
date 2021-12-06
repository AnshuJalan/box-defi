import { Reducer } from "redux";
import { BeaconWallet } from "@taquito/beacon-wallet";

// Actions and types
import { WalletAction } from "../actions";
import * as t from "../types";

interface WalletState {
  isConnected: boolean;
  walletInstance: BeaconWallet | null;
  accountPkh: string;
  tokenBalances: {
    kUSD: number;
    bSEED: number;
  };
  fruitBalances: {
    elderGrape: number;
    mangrot: number;
    spotBerry: number;
    blueStripe: number;
    crownApple: number;
  };
}

const initialState: WalletState = {
  isConnected: false,
  walletInstance: null,
  accountPkh: "",
  tokenBalances: {
    kUSD: 0,
    bSEED: 0,
  },
  fruitBalances: {
    elderGrape: 0,
    mangrot: 0,
    spotBerry: 0,
    blueStripe: 0,
    crownApple: 0,
  },
};

export const walletReducer: Reducer<WalletState, WalletAction> = (state = initialState, action): WalletState => {
  switch (action.type) {
    case t.WalletActionTypes.CONNECT_WALLET: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
