import { createSlice } from "@reduxjs/toolkit";
import { IBusiness } from "@codernex/types";

const initialState: { business: IBusiness | null; isLoading: boolean } = {
  business: null,
  isLoading: false,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    getBusiness: (state, action) => {
      state.business = action.payload;
      state.isLoading = false;
    },
    createBusiness: (state, action) => {
      (state.business = action.payload), (state.isLoading = false);
    },
  },
});

export default businessSlice.reducer;

export const { getBusiness, createBusiness } = businessSlice.actions;
