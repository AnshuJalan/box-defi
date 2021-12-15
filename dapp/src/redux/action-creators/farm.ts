import { Dispatch } from "redux";
import axios from "axios";

// Actions and types
import * as t from "../types";
import { FarmAction } from "../actions";
import { BoxStage, Box } from "../actions/farm";

// Rootstate
import { RootState } from "../reducers";

// Utils
import { indexerAPI, waterPeriod } from "../../utils/global";

export const loadBoxes =
  () =>
  async (dispatch: Dispatch<FarmAction>, getState: () => RootState): Promise<void> => {
    const { accountPkh } = getState().wallet;

    try {
      // Retrieve boxes
      const _res = await axios.get(`${indexerAPI}/boxes?address=${accountPkh}`);
      const boxes: Box[] = [];
      // Iterate and assign stages
      for (const box of _res.data) {
        boxes.push({
          key: box.key,
          ...findStage(parseInt(box.timesWatered), box.lastWatered),
        });
      }

      dispatch({
        type: t.FarmActionTypes.LOAD_BOXES,
        payload: boxes,
      });
    } catch (err) {
      console.error(err);
    }
  };

const findStage = (
  timesWatered: number,
  lastWatered: string
): { stage: BoxStage; needsWater: boolean; waterBy: number } => {
  const notWateredIn = Date.now() - new Date(lastWatered).getTime();
  if (notWateredIn > 2 * waterPeriod && timesWatered !== 5)
    return { stage: BoxStage.DEAD, waterBy: 0, needsWater: false };
  else {
    return {
      waterBy: 2 * waterPeriod - notWateredIn,
      needsWater: notWateredIn > waterPeriod,
      stage:
        notWateredIn > waterPeriod
          ? BoxStage[`STAGE_${timesWatered + 1}` as keyof typeof BoxStage]
          : BoxStage[`STAGE_${timesWatered}` as keyof typeof BoxStage],
    };
  }
};
