import * as t from "../types";

export interface LoadStatsAction {
  type: t.StatsActionTypes.LOAD_STATS;
  payload: {
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
  };
}
