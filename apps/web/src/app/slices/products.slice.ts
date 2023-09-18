import { createSlice } from "@reduxjs/toolkit";

interface IProductsState {
  products: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    getProductsErr: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.products = [];
    },
    createProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      state.isLoading = false;
    },
    createProductErr: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;

export const {
  getProducts,
  startLoading,
  createProduct,
  createProductErr,
  getProductsErr,
} = productsSlice.actions;
