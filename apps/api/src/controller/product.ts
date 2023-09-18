import { requestHandler } from "helper";
import { Controller } from "./base";
import { createProductSchema } from "@codernex/schema";

export class ProductController extends Controller {
  createProduct = requestHandler(
    async (req, res, next) => {
      try {
        const { price, unitCost, name, businessId, unitType, categoryId } =
          req.body;
        const grossProfit = price - unitCost;
        const grossMargin = ((price - unitCost) / price) * 100;
        const product = await this._p.product.create({
          data: {
            grossMargin,
            grossProfit,
            name,
            unitType,
            discount: 0,
            categoryId,
            businessId,
          },
        });
        res.status(200).json({ data: product });
      } catch (err) {
        console.log(err);
      }
    },
    { body: createProductSchema }
  );
}
