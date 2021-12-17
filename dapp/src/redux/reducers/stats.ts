import { Reducer } from "redux";

// Utils
import { Fruits } from "../../utils/global";

// Actions and types
import { StatsAction } from "../actions";
import * as t from "../types";

interface StatsState {
  seedSupply: string;
  seedsPlanted: string;
  kUSDLocked: string;
  numBoxes: string;
  fruitsHarvested: {
    [key in keyof typeof Fruits]: string;
  };
}

const initialState: StatsState = {
  seedSupply: "0",
  seedsPlanted: "0",
  kUSDLocked: "0",
  numBoxes: "0",
  fruitsHarvested: {
    [Fruits.ELDER_GRAPE]: "0",
    [Fruits.MANGROT]: "0",
    [Fruits.SPOT_BERRY]: "0",
    [Fruits.BLUE_STRIPE]: "0",
    [Fruits.CROWN_APPLE]: "0",
  },
};

export const statsReducer: Reducer<StatsState, StatsAction> = (state = initialState, action): StatsState => {
  switch (action.type) {
    case t.StatsActionTypes.LOAD_STATS: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
