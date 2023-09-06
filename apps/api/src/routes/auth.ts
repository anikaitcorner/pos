import { AuthController } from "@/controller";
import express, { Router } from "express";

export const authRoutes: Router = express.Router();

const authController = new AuthController();

authRoutes.route("/").post(authController.loginUser);

authRoutes.post("/refresh", authController.refreshAuth);
