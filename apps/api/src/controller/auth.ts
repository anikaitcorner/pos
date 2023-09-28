import { Controller } from "./base";
import { requestHandler } from "helper";
import { loginSchema } from "@codernex/schema";
import { ApiError } from "utils/error";
import * as bcrypt from "bcryptjs";
import { sendToken } from "utils/authToken";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import sanitizedConfig from "config";
import { User } from "orm";

export class AuthController extends Controller<User> {
  constructor() {
    super(User);
  }

  public loginUser = requestHandler(
    async (req, res, next) => {
      try {
        const user = await this.repository
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.business", "business")
          .where("user.username=:username", {
            username: req.body.usernameOrEmail,
          })
          .orWhere("user.email=:username", {
            username: req.body.usernameOrEmail,
          })
          .getOne();

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

        const user = await this.repository.findOne({
          where: {
            id: isValidRefreshToken.sub,
          },
          relations: {
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
