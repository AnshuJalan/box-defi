import { Reducer } from "redux";

// Actions and types
import { FarmAction } from "../actions";
import { Box } from "../actions/farm";
import * as t from "../types";

interface FarmState {
  boxes: Box[];
}

const initialState: FarmState = {
  boxes: [],
};

export const farmReducer: Reducer<FarmState, FarmAction> = (state = initialState, action): FarmState => {
  switch (action.type) {
    case t.FarmActionTypes.LOAD_BOXES: {
      return {
        boxes: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
