import { CategoryController } from "@/controller";
import { Router } from "express";

export const categoryRoutes = Router() as Router;
const controller = new CategoryController();

categoryRoutes
  .route("/")
  .get(controller.getCategories)
  .post(controller.createCategory);
