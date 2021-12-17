import { BeaconWallet } from "@taquito/beacon-wallet";
import { Fruits } from "../../utils/global";
import * as t from "../types";

export interface ConnectWalletAction {
  type: t.WalletActionTypes.CONNECT_WALLET;
  payload: {
    isConnected: boolean;
    walletInstance: BeaconWallet;
    accountPkh: string;
  };
}

export interface GetBalancesAction {
  type: t.WalletActionTypes.GET_BALANCES;
  payload: {
    tokenBalances: {
      kUSD: string;
      SEED: string;
    };
    fruitBalances: {
      [key in keyof typeof Fruits]: string;
    };
  };
}
