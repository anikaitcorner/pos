import { requestHandler } from "helper";
import { Controller } from "./base";
import { User } from "@/models";
import { createUserSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError, ErrorHandler } from "@/utils";
import { z } from "zod";

export class UserController extends Controller<User> {
  constructor() {
    super(User);
  }

  public getUsers = requestHandler(async (req, res) => {
    const user = await this.repository.createQueryBuilder("user").getMany();

    res.status(200).json({
      data: user,
    });
  });

  public createUser = requestHandler(
    async (req, res, next) => {
      try {
        const user = this.repository.create();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.username = req.body.username;

        await this.repository.save(user);

        res.status(201).json({
          data: user,
        });
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
        const user = await this.repository
          .createQueryBuilder("user")
          .where("user.id=:id", { id: req.params.id })
          .getOne();

        if (!user) {
          return ApiError("User not found with corresponding id", 404, next);
        }

        await this.repository.remove(user);

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
}
