import { Controller } from "./base";
import { createCategorySchema } from "@codernex/schema";
import { requestHandler } from "helper";
import { Category } from "orm";

export class CategoryController extends Controller<Category> {
  constructor() {
    super(Category);
  }

  createCategory = requestHandler(
    async (req, res, next) => {
      const category = this.repository.create({
        name: req.body.name,
      });

      await this.repository.save(category);

      res.status(201).json({ data: category });
    },
    {
      body: createCategorySchema,
    }
  );

  getCategories = requestHandler(async (req, res, next) => {
    const category = await this.repository.find();

    res.status(201).json({ data: category });
  });
}
