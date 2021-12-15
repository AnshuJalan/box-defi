import * as t from "../types";

export enum BoxStage {
  STAGE_1 = "STAGE_1",
  STAGE_2 = "STAGE_2",
  STAGE_3 = "STAGE_3",
  STAGE_4 = "STAGE_4",
  STAGE_5 = "STAGE_5",
  STAGE_6 = "STAGE_6",
  DEAD = "DEAD",
}

export interface Box {
  key: number;
  waterBy: number;
  needsWater: boolean;
  stage: BoxStage;
}

export interface LoadBoxesAction {
  type: t.FarmActionTypes.LOAD_BOXES;
  payload: Box[];
}
