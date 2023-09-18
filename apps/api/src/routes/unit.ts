import { UnitController } from "@/controller";
import { Router } from "express";

export const unitRoutes = Router() as Router;
const controller = new UnitController();

unitRoutes.route("/").get(controller.getUnits).post(controller.createUnit);
