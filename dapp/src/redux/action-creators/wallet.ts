import { Dispatch } from "redux";
import { NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";

// Actions and types
import { WalletAction } from "../actions";
import * as t from "../types";

// Globals
import { network } from "../../utils/global";

export const connectWallet =
  (requestPermission: boolean) =>
  async (dispatch: Dispatch<WalletAction>): Promise<void> => {
    const wallet = new BeaconWallet({
      name: "Box DeFi",
      preferredNetwork: network as NetworkType,
    });

    if (!requestPermission) {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const accountPkh = await wallet.getPKH();

        dispatch({
          type: t.WalletActionTypes.CONNECT_WALLET,
          payload: {
            isConnected: true,
            walletInstance: wallet,
            accountPkh,
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
          },
        });
      }
    } else {
      await wallet.requestPermissions({ network: { type: network as NetworkType } });

      const accountPkh = await wallet.getPKH();

      dispatch({
        type: t.WalletActionTypes.CONNECT_WALLET,
        payload: {
          isConnected: true,
          walletInstance: wallet,
          accountPkh,
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
        },
      });
    }
  };
