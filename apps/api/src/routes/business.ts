import { BusinessController } from "controller/business";
import { Router } from "express";

export const businessRoutes = Router() as Router;

const businessController = new BusinessController();

businessRoutes
  .route("/")
  .post(businessController.createBusiness)
  .get(businessController.getBusiness);
