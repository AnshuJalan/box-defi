import { combineReducers } from "redux";

import { walletReducer } from "./wallet";
import { contractReducer } from "./contract";
import { loaderReducer } from "./loader";
import { statsReducer } from "./stats";

export const rootReducer = combineReducers({
  wallet: walletReducer,
  contract: contractReducer,
  loader: loaderReducer,
  stats: statsReducer,
});

// Reducer's root-state
export type RootState = ReturnType<typeof rootReducer>;
