import { combineReducers } from "redux";

import { walletReducer } from "./wallet";
import { contractReducer } from "./contract";
import { loaderReducer } from "./loader";

export const rootReducer = combineReducers({
  wallet: walletReducer,
  contract: contractReducer,
  loader: loaderReducer,
});

// Reducer's root-state
export type RootState = ReturnType<typeof rootReducer>;
