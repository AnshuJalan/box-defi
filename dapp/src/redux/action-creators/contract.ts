import { Dispatch } from "redux";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

// Actions and types
import { ContractAction } from "../actions";
import * as t from "../types";

// Root state of the reducer
import { RootState } from "../reducers";

// Utils
import {
  kUSDAddress,
  seedAddress,
  boxFruitAddress,
  boxPoolAddress,
  boxFarmAddress,
  kUSDFaucetAddress,
  rpcNode,
} from "../../utils/global";

export const loadContracts =
  () =>
  async (dispatch: Dispatch<ContractAction>, getState: () => RootState): Promise<void> => {
    const walletInstance = getState().wallet.walletInstance as BeaconWallet;

    const Tezos = new TezosToolkit(rpcNode);
    Tezos.setWalletProvider(walletInstance);

    try {
      const kUSDContract = await Tezos.wallet.at(kUSDAddress);
      const seedContract = await Tezos.wallet.at(seedAddress);
      const boxFruitContract = await Tezos.wallet.at(boxFruitAddress);
      const boxPoolContract = await Tezos.wallet.at(boxPoolAddress);
      const boxFarmContract = await Tezos.wallet.at(boxFarmAddress);
      const kUSDFaucetContract = await Tezos.wallet.at(kUSDFaucetAddress);

      dispatch({
        type: t.ContractActionTypes.LOAD_CONTRACTS,
        payload: {
          tezos: Tezos,
          kUSDContract,
          seedContract,
          boxFruitContract,
          boxPoolContract,
          boxFarmContract,
          kUSDFaucetContract,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
