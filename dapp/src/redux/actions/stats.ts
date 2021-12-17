import * as t from "../types";
import { Fruits } from "../../utils/global";

export interface LoadStatsAction {
  type: t.StatsActionTypes.LOAD_STATS;
  payload: {
    seedSupply: string;
    seedsPlanted: string;
    kUSDLocked: string;
    numBoxes: string;
    fruitsHarvested: {
      [key in keyof typeof Fruits]: string;
    };
  };
}
