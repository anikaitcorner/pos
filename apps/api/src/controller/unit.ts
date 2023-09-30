import { Controller } from "./base";
import { createUnitSchema } from "@codernex/schema";
import { requestHandler } from "helper";
import { Unit } from "orm";

export class UnitController extends Controller<Unit> {
  constructor() {
    super(Unit);
  }

  createUnit = requestHandler(
    async (req, res, next) => {
      const unit = this.repository.create({
        name: req.body.name,
        shortName: req.body.shortName,
      });

      await this.repository.save(unit);
      res.status(201).json({ data: unit });
    },
    {
      body: createUnitSchema,
    }
  );

  getUnits = requestHandler(async (req, res, next) => {
    const units = await this.repository.find();

    res.status(201).json({ data: units });
  });
}
