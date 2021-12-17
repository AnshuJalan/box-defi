import { Dispatch } from "redux";
import { NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";

// Actions and types
import { WalletAction } from "../actions";
import * as t from "../types";

// API
import { getFA12Balance, getFA2Balance } from "../../api";

// Globals
import { Fruits, network, kUSDAddress, seedAddress, boxFruitAddress } from "../../utils/global";

import { RootState } from "../reducers";

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
        },
      });
    }
  };

export const getBalances = () => async (dispatch: Dispatch<WalletAction>, getState: () => RootState) => {
  const accountPkh = getState().wallet.accountPkh;

  const kUSD = await getFA12Balance(kUSDAddress, accountPkh);
  const SEED = await getFA12Balance(seedAddress, accountPkh);

  const elderGrape = await getFA2Balance(boxFruitAddress, accountPkh, "1");
  const mangrot = await getFA2Balance(boxFruitAddress, accountPkh, "2");
  const spotBerry = await getFA2Balance(boxFruitAddress, accountPkh, "3");
  const blueStripe = await getFA2Balance(boxFruitAddress, accountPkh, "4");
  const crownApple = await getFA2Balance(boxFruitAddress, accountPkh, "5");

  dispatch({
    type: t.WalletActionTypes.GET_BALANCES,
    payload: {
      tokenBalances: {
        kUSD,
        SEED,
      },
      fruitBalances: {
        [Fruits.ELDER_GRAPE]: elderGrape,
        [Fruits.MANGROT]: mangrot,
        [Fruits.SPOT_BERRY]: spotBerry,
        [Fruits.BLUE_STRIPE]: blueStripe,
        [Fruits.CROWN_APPLE]: crownApple,
      },
    },
  });
};
