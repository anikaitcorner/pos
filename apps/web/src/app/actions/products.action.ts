import api from "@/api";
import {
  createProduct,
  getProducts,
  getProductsErr,
  startLoading,
} from "../slices/products.slice";
import { AppDispatch } from "../store";
import { AxiosError } from "axios";
import { IApiError, IApiResponse } from "@codernex/types";
import { createProductSchema } from "@codernex/schema";
import { z } from "zod";

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get("/products")
    .then((res) => dispatch(getProducts(res.data.data)))
    .catch((err: AxiosError<IApiResponse<IApiError>>) => {
      if (err.response) {
        dispatch(getProductsErr(err?.response?.data?.error?.message));
      }
    });
};

export const createProducts =
  (data: z.infer<typeof createProductSchema>) =>
  async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/products", data)
      .then((res) => dispatch(createProduct(res.data.data)))
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        if (err.response) {
          dispatch(getProductsErr(err?.response?.data?.error?.message));
        }
      });
  };

export const udpateProduct =
  (id: number, data: any) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post(`/products/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        if (err.response) {
          dispatch(getProductsErr(err?.response?.data?.error?.message));
        }
      });
  };
