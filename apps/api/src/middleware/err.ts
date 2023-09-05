import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "@/utils";
import { IApiError, IApiResponse } from "@codernex/types";

export function errorMiddleware(
  err: ErrorHandler,
  _req: Request,
  res: Response<IApiResponse<IApiError>>,
  _next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server Error";

  return res.status(err.statusCode).json({
    error: {
      message: err.message,
      statusCode: err.statusCode,
    },
  });
}
