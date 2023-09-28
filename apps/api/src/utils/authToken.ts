import sanitizedConfig from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { IApiResponse } from "@codernex/types";
import { User } from "orm/entity";

export const sendToken = (
  res: Response<IApiResponse<any>>,
  user: User,
  next: NextFunction
) => {
  const token = jwt.sign(
    { sub: user.id, email: user.email, username: user.name },
    sanitizedConfig.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60,
    }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, email: user.email, username: user.name },
    sanitizedConfig.REFRESH_SECRET,
    {
      expiresIn: "1d",
    }
  );

  if (!token || !refreshToken) {
    return ApiError(
      "Please Login Again There are some unexpected error",
      404,
      next
    );
  }

  const { password, ...userWithoutPass } = user;

  res.status(200).json({
    data: {
      user: userWithoutPass,
      accessToken: token,
      refreshToken,
    },
  });
};
