import { requestHandler } from "helper";
import { IApiError, IApiResponse } from "@codernex/types";
import { ApiError } from "@/utils";
export const isAuthenticated = requestHandler<
  unknown,
  unknown,
  unknown,
  IApiResponse<IApiError>
>(async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return ApiError("No valid token found", 404, next);
    }
  } catch (err) {
    return ApiError(err as any, 404, next);
  }
});
