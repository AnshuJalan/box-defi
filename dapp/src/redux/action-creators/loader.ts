// Actions and types
import { LoaderAcion } from "../actions";
import * as t from "../types";

export const hideLoader = (): LoaderAcion => {
  return {
    type: t.LoaderActionTypes.HIDE_LOADER,
  };
};

export const setLoading = (text: string): LoaderAcion => {
  return {
    type: t.LoaderActionTypes.SET_LOADING,
    payload: text,
  };
};

export const setSuccess = (text: string): LoaderAcion => {
  return {
    type: t.LoaderActionTypes.SET_SUCCESS,
    payload: text,
  };
};

export const setFailure = (text: string): LoaderAcion => {
  return {
    type: t.LoaderActionTypes.SET_FAILURE,
    payload: text,
  };
};
