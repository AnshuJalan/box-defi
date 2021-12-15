export enum WalletActionTypes {
  CONNECT_WALLET = "CONNECT_WALLET",
  GET_BALANCES = "GET_BALANCES",
}

export enum ContractActionTypes {
  LOAD_CONTRACTS = "LOAD_CONTRACTS",
}

export enum StatsActionTypes {
  LOAD_STATS = "LOAD_STATS",
}

export enum FarmActionTypes {
  LOAD_BOXES = "LOAD_BOXES",
}

export enum LoaderActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_SUCCESS = "SET_SUCCESS",
  SET_FAILURE = "SET_FAILURE",
  HIDE_LOADER = "HIDE_LOADER",
}
