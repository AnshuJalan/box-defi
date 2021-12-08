import { Reducer } from "redux";

// Actions and types
import { LoaderAcion } from "../actions";
import * as t from "../types";

export enum Status {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

interface LoaderState {
  show: boolean;
  status: Status | undefined;
  text: string;
}

const initialState: LoaderState = {
  show: false,
  status: undefined,
  text: "",
};

export const loaderReducer: Reducer<LoaderState, LoaderAcion> = (state = initialState, action): LoaderState => {
  switch (action.type) {
    case t.LoaderActionTypes.SET_LOADING: {
      return {
        show: true,
        status: Status.LOADING,
        text: action.payload,
      };
    }
    case t.LoaderActionTypes.SET_SUCCESS: {
      return {
        show: true,
        status: Status.SUCCESS,
        text: action.payload,
      };
    }
    case t.LoaderActionTypes.SET_FAILURE: {
      return {
        show: true,
        status: Status.FAILURE,
        text: action.payload,
      };
    }
    case t.LoaderActionTypes.HIDE_LOADER: {
      return {
        ...state,
        show: false,
      };
    }
    default: {
      return state;
    }
  }
};
