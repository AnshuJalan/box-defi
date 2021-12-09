import { Dispatch } from "react";

// API
import { getFA12Balance, getFA12TotalSupply, getFA2TotalSupply } from "../../api";

// Utils
import { kUSDAddress, seedAddress, boxFarmAddress, boxPoolAddress, boxFruitAddress } from "../../utils/global";

// Types and actions
import { StatsAction } from "../actions";
import * as t from "../types";

export const loadStats = () => async (dispatch: Dispatch<StatsAction>) => {
  try {
    const seedSupply = await getFA12TotalSupply(seedAddress);
    const seedsPlanted = await getFA12Balance(seedAddress, boxFarmAddress);
    const kUSDLocked = await getFA12Balance(kUSDAddress, boxPoolAddress);

    const elderGrape = await getFA2TotalSupply(boxFruitAddress, "1");
    const mangrot = await getFA2TotalSupply(boxFruitAddress, "2");
    const spotBerry = await getFA2TotalSupply(boxFruitAddress, "3");
    const blueStripe = await getFA2TotalSupply(boxFruitAddress, "4");
    const crownApple = await getFA2TotalSupply(boxFruitAddress, "5");

    dispatch({
      type: t.StatsActionTypes.LOAD_STATS,
      payload: {
        seedSupply,
        seedsPlanted,
        kUSDLocked,
        fruitsHarvested: {
          elderGrape,
          mangrot,
          spotBerry,
          blueStripe,
          crownApple,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
