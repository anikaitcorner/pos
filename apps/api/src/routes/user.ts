import { UserController } from "controller/user";
import express, { Router } from "express";

export const userRoutes: Router = express.Router();

const userController = new UserController();

userRoutes
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);
