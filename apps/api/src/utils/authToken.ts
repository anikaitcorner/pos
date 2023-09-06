import { User } from "@prisma/client";
import sanitizedConfig from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { IApiResponse } from "@codernex/types";

export const sendToken = (
  res: Response<IApiResponse<any>>,
  user: User,
  next: NextFunction
) => {
  const token = jwt.sign(
    { sub: user.id, email: user.email, username: user.name },
    sanitizedConfig.JWT_SECRET,
    {
      expiresIn: 60,
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

  res
    .cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "none",
      secure: sanitizedConfig.NODE_ENV === "production",
    })
    .status(200)
    .json({
      data: {
        user,
        accessToken: token,
        refreshToken,
      },
    });
};
