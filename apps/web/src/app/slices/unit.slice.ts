import { IUnit } from "@codernex/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  units: IUnit[];
  isLoading: boolean;
} = {
  units: [],
  isLoading: false,
};

const unit = createSlice({
  name: "unit",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getUnits: (state, action) => {
      state.isLoading = false;
      state.units = action.payload;
    },
    createUnit: (state, action) => {
      state.isLoading = false;
      state.units = state.units.concat(action.payload);
    },
  },
});

export default unit.reducer;

export const { createUnit, getUnits, startLoading } = unit.actions;
