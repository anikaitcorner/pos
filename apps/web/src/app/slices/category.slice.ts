import { ICategory } from "@codernex/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  categories: ICategory[];
  isLoading: boolean;
} = {
  categories: [],
  isLoading: false,
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getCategories: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    createCategory: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.concat(action.payload);
    },
  },
});

export default category.reducer;

export const { createCategory, getCategories, startLoading } = category.actions;
