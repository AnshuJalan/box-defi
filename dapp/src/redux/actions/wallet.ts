import { BeaconWallet } from "@taquito/beacon-wallet";
import * as t from "../types";

export interface ConnectWalletAction {
  type: t.WalletActionTypes.CONNECT_WALLET;
  payload: {
    isConnected: boolean;
    walletInstance: BeaconWallet;
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
  };
}
