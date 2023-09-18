import api from "@/api";
import {
  createCategory,
  getCategories,
  startLoading,
} from "../slices/category.slice";
import { AppDispatch } from "../store";
import { IApiResponse, ICategory } from "@codernex/types";
import { z } from "zod";
import { createCategorySchema } from "@codernex/schema";
import toast from "react-hot-toast";

export const fetchCategory = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get<IApiResponse<ICategory[]>>("/categories")
    .then((res) => {
      dispatch(getCategories(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCategory =
  (data: z.infer<typeof createCategorySchema>) =>
  async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post<IApiResponse<ICategory>>("/categories", data)
      .then((res) => {
        dispatch(createCategory(res.data.data));
        toast.success("Category Created", { duration: 1000 });
      })
      .catch((err) => {
        console.log(err);
      });
  };
