import api from "@/api";
import { AppDispatch } from "../store";
import { IApiError, IApiResponse, IBusiness } from "@codernex/types";
import { getBusiness, createBusiness } from "../slices/business.slice";
import { z } from "zod";
import { createBusinessSchema } from "@codernex/schema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export const fetchBusiness =
  (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    api
      .get<IApiResponse<IBusiness>>("/business")
      .then((res) => {
        dispatch(getBusiness(res.data.data));
        if (!res.data) {
          navigate("/business/create");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const createNewBusiness =
  (data: z.infer<typeof createBusinessSchema>) =>
  async (dispatch: AppDispatch) => {
    api
      .post<IApiResponse<IBusiness>>("/business", data)
      .then((res) => dispatch(createBusiness(res.data.data)))
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        toast.error(err.response?.data.error?.message as string);
      });
  };
