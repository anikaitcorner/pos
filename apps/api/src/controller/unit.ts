import { Controller } from "./base";
import { createUnitSchema } from "@codernex/schema";
import { requestHandler } from "helper";

export class UnitController extends Controller {
  constructor() {
    super();
  }

  createUnit = requestHandler(
    async (req, res, next) => {
      const unit = await this._p.unit.create({
        data: {
          name: req.body.name,
          shortName: req.body.shortName,
        },
      });

      res.status(201).json({ data: unit });
    },
    {
      body: createUnitSchema,
    }
  );

  getUnits = requestHandler(async (req, res, next) => {
    const units = await this._p.unit.findMany();

    res.status(201).json({ data: units });
  });
}
