import { requestHandler } from "helper";
import { Controller } from "./base";
import { createUserSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError, ErrorHandler, sendToken } from "@/utils";
import { z } from "zod";
import { User } from "orm/entity";

export class UserController extends Controller<User> {
  constructor() {
    super(User);
  }

  public getUsers = requestHandler(async (req, res) => {
    const user = await this.repository.find({ select: { password: false } });
    res.status(200).json({
      data: user,
    });
  });

  public createUser = requestHandler(
    async (req, res, next) => {
      try {
        if (req.body.secret !== "226593") {
          return ApiError("Invalid secret key", 404, next);
        }

        const hashedPwd = bcrypt.hashSync(req.body.password, 10);

        const user = this.repository.create({
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          password: hashedPwd,
          role: req.body.role,
        });

        await this.repository.save(user);

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
        const user = await this.repository.update(
          {
            id: req.params.id,
          },
          {}
        );

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
    return await this.repository.findOne({
      where: { id },
      relations: { business: true },
    });
  }
}
