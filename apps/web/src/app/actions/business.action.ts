import api from "@/api";
import { IApiError, IApiResponse, IBusiness } from "@codernex/types";

import { z } from "zod";
import { createBusinessSchema } from "@codernex/schema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { BusinessAction } from "../slices/business.slice";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchBusiness =
  (navigate: NavigateFunction) =>
  async (dispatch: Dispatch<BusinessAction>) => {
    dispatch({ type: "FETCH_BUSINESS_LOADING" });
    api
      .get<IApiResponse<IBusiness>>("/business")
      .then((res) => {
        dispatch({ type: "FETCH_BUSINESS_SUCESS", payload: res.data.data });
        if (res.data.data && !res.data.data.id) {
          navigate("/business/create");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/business/create");
      });
  };

export const createNewBusiness =
  (data: z.infer<typeof createBusinessSchema>) =>
  async (dispatch: Dispatch<BusinessAction>) => {
    dispatch({ type: "CreateBusinessLoading" });
    api
      .post<IApiResponse<IBusiness>>("/business", data)
      .then((res) => {
        res.data.data &&
          dispatch({ type: "CreateBusinessLoading", paylaod: res.data.data });
      })
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        toast.error(err.response?.data.error?.message as string);
      });
  };
