import { Reducer } from "redux";

// Actions and types
import { StatsAction } from "../actions";
import * as t from "../types";

interface StatsState {
  seedSupply: string;
  seedsPlanted: string;
  kUSDLocked: string;
  fruitsHarvested: {
    elderGrape: string;
    mangrot: string;
    spotBerry: string;
    blueStripe: string;
    crownApple: string;
  };
}

const initialState: StatsState = {
  seedSupply: "0",
  seedsPlanted: "0",
  kUSDLocked: "0",
  fruitsHarvested: {
    elderGrape: "0",
    mangrot: "0",
    spotBerry: "0",
    blueStripe: "0",
    crownApple: "0",
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
