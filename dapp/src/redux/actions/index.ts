import { SetLoadingAction, SetFailureAction, SetSuccessAction, HideLoaderAction } from "./loader";
import { LoadStatsAction } from "./stats";
import { ConnectWalletAction, GetBalancesAction } from "./wallet";
import { LoadContractsAction } from "./contract";
import { LoadBoxesAction } from "./farm";

export type ContractAction = LoadContractsAction;
export type WalletAction = ConnectWalletAction | GetBalancesAction;
export type LoaderAcion = SetFailureAction | SetSuccessAction | SetLoadingAction | HideLoaderAction;
export type StatsAction = LoadStatsAction;
export type FarmAction = LoadBoxesAction;
