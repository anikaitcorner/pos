import { Controller } from "./base";
import { requestHandler } from "helper";
import { loginSchema } from "@codernex/schema";
import { ApiError } from "utils/error";
import * as bcrypt from "bcryptjs";
import { sendToken } from "utils/authToken";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import sanitizedConfig from "config";

export class AuthController extends Controller {
  constructor() {
    super();
  }

  public loginUser = requestHandler(
    async (req, res, next) => {
      try {
        const user = await this._p.user.findFirstOrThrow({
          where: {
            OR: [
              {
                username: req.body.usernameOrEmail,
              },
              {
                email: req.body.usernameOrEmail,
              },
            ],
          },
          include: {
            business: true,
          },
        });

        if (!user) {
          return ApiError("Invalid username or password", 404, next);
        }

        const isPasswordMatch = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!isPasswordMatch) {
          return ApiError("Invalid username or password", 404, next);
        }

        sendToken(res, user, next);
      } catch (err: any) {
        return ApiError(err.message, 404, next);
      }
    },
    {
      body: loginSchema,
    }
  );

  public refreshAuth = requestHandler(
    async (req, res, next) => {
      try {
        const isValidRefreshToken = jwt.verify(
          req.body.refreshToken,
          sanitizedConfig.REFRESH_SECRET
        ) as JwtPayload;

        if (!isValidRefreshToken) {
          return ApiError("Not a valid refresh token", 404, next);
        }

        const user = await this._p.user.findFirst({
          where: {
            id: isValidRefreshToken.sub,
          },
          include: {
            business: true,
          },
        });
        if (!user) {
          return ApiError("Something went wrong", 500, next);
        }
        sendToken(res, user, next);
      } catch (err: any) {
        return ApiError(err.message, 400, next);
      }
    },
    {
      body: z.object({ refreshToken: z.string() }),
    }
  );
}
