import { combineReducers } from "redux";

import { walletReducer } from "./wallet";

export const rootReducer = combineReducers({
  wallet: walletReducer,
});

// Reducer's root-state
export type RootState = ReturnType<typeof rootReducer>;
