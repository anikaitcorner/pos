import { Reducer } from "@reduxjs/toolkit";
import { IBusiness } from "@codernex/types";

const initialState: {
  business: IBusiness | null | undefined;
  isLoading: boolean;
} = {
  business: null,
  isLoading: false,
};

interface FetchBusinessLoading {
  type: "FETCH_BUSINESS_LOADING";
}

interface FetchBusinessSuccess {
  type: "FETCH_BUSINESS_SUCESS";
  payload: IBusiness | null | undefined;
}

interface CreateBusinessLoading {
  type: "CreateBusinessLoading";
}
interface CreateBusinessSuccess {
  type: "CreateBusinessSuccess";
  payload: IBusiness;
}

export type BusinessAction =
  | FetchBusinessLoading
  | FetchBusinessSuccess
  | CreateBusinessLoading
  | CreateBusinessSuccess;

const business: Reducer<typeof initialState, BusinessAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "FETCH_BUSINESS_LOADING":
      return { ...state, isLoading: true };
    case "FETCH_BUSINESS_SUCESS":
      return { isLoading: false, business: action.payload };
    default:
      return state;
  }
};

export default business;
