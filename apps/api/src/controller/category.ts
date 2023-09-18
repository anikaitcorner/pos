import { Controller } from "./base";
import { createCategorySchema } from "@codernex/schema";
import { requestHandler } from "helper";

export class CategoryController extends Controller {
  constructor() {
    super();
  }

  createCategory = requestHandler(
    async (req, res, next) => {
      const category = await this._p.category.create({
        data: {
          name: req.body.name,
        },
      });

      res.status(201).json({ data: category });
    },
    {
      body: createCategorySchema,
    }
  );

  getCategories = requestHandler(async (req, res, next) => {
    const category = await this._p.category.findMany();

    res.status(201).json({ data: category });
  });
}
