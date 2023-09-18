import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import products from "../slices/products.slice";
import business from "../slices/business.slice";
import categories from "../slices/category.slice";
import units from "../slices/unit.slice";

export const store = configureStore({
  reducer: {
    products,
    business,
    categories,
    units,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
