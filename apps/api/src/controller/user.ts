import { requestHandler } from "helper";
import { Controller } from "./base";
import { createUserSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError, ErrorHandler, sendToken } from "@/utils";
import { z } from "zod";

export class UserController extends Controller {
  constructor() {
    super();
  }

  public getUsers = requestHandler(async (req, res) => {
    const user = await this._p.user.findMany({
      select: {
        password: false,
      },
    });
    res.status(200).json({
      data: user,
    });
  });

  public createUser = requestHandler(
    async (req, res, next) => {
      try {
        const hashedPwd = bcrypt.hashSync(req.body.password, 10);
        const user = await this._p.user.create({
          data: {
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: hashedPwd,
          },
        });

        sendToken(res, user, next);
      } catch (err) {
        const body = err as ErrorHandler;

        return ApiError(body.message, 400, next);
      }
    },
    {
      body: createUserSchema,
    }
  );

  public updateUser = requestHandler(
    async (req, res, next) => {
      try {
        const user = await this._p.user.findFirst({
          where: {
            id: req.params.id,
          },
        });

        res.status(200).json({
          data: user,
        });
      } catch (err) {
        const body = err as ErrorHandler;

        return ApiError(body.message, 400, next);
      }
    },
    {
      params: z.object({ id: z.string() }),
    }
  );

  async findUserById(id?: string) {
    return await this._p.user.findUnique({ where: { id } });
  }
}
