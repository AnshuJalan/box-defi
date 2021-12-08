import * as t from "../types";

export interface SetLoadingAction {
  type: t.LoaderActionTypes.SET_LOADING;
  payload: string;
}

export interface SetSuccessAction {
  type: t.LoaderActionTypes.SET_SUCCESS;
  payload: string;
}

export interface SetFailureAction {
  type: t.LoaderActionTypes.SET_FAILURE;
  payload: string;
}

export interface HideLoaderAction {
  type: t.LoaderActionTypes.HIDE_LOADER;
}
