import { ProductController } from "controller/product";
import { Router } from "express";

export const productRoutes = Router() as Router;
const controller = new ProductController();

productRoutes
  .route("/")
  .get(controller.getProducts)
  .post(controller.createProduct);
