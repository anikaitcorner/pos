import { requestHandler } from "helper";
import { Controller } from "./base";
import { createProductSchema } from "@codernex/schema";
import { Product } from "orm";

export class ProductController extends Controller<Product> {
  constructor() {
    super(Product);
  }
  createProduct = requestHandler(
    async (req, res, next) => {
      try {
        const { price, unitCost, name, unitType, sku } = req.body;
        const grossProfit = price - unitCost;
        const grossMargin = ((price - unitCost) / price) * 100;
        const product = this.repository.create({
          name,
          unitCost,
          price,
          unitType,
          sku,
          grossMargin,
          grossProfit,
          category: {
            id: req.body.categoryId,
          },
          business: {
            id: req.body.businessId,
          },
        });

        await this.repository.save(product);
        res.status(200).json({ data: product });
      } catch (err) {
        console.log(err);
      }
    },
    { body: createProductSchema }
  );

  getProducts = requestHandler(async (req, res) => {
    const products = await this.repository.find({
      relations: { category: true, business: true },
      where: {
        business: {
          users: {
            id: req.user?.id,
          },
        },
      },
    });
    res.status(200).json({ data: products });
  });
}
