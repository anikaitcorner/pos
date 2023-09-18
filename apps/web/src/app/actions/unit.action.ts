import api from "@/api";
import { createUnit, getUnits, startLoading } from "../slices/unit.slice";
import { AppDispatch } from "../store";
import { IApiResponse, IUnit } from "@codernex/types";
import { z } from "zod";
import { createUnitSchema } from "@codernex/schema";
import toast from "react-hot-toast";

export const fetchUnits = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get<IApiResponse<IUnit[]>>("/units")
    .then((res) => {
      dispatch(getUnits(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postUnit =
  (data: z.infer<typeof createUnitSchema>) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post<IApiResponse<IUnit>>("/units", data)
      .then((res) => {
        dispatch(createUnit(res.data.data));
        toast.success("Unit Created", { duration: 1000 });
      })
      .catch((err) => {
        console.log(err);
      });
  };
