import { UserController } from "controller/user";
import express, { Router } from "express";
import { isAuthenticated } from "@/middleware";

export const userRoutes: Router = express.Router();

const userController = new UserController();

userRoutes
  .route("/")
  .get(isAuthenticated, userController.getUsers)
  .post(userController.createUser);

userRoutes.route("/:id").patch(userController.updateUser);
