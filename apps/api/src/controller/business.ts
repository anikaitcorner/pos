import { requestHandler } from "helper";
import { Controller } from "./base";
import { createBusinessSchema } from "@codernex/schema";
import { ApiError } from "@/utils";

export class BusinessController extends Controller {
  constructor() {
    super();
  }

  createBusiness = requestHandler(
    async (req, res, next) => {
      try {
        const user = req.user;

        const business = await this._p.business.create({
          data: {
            name: req.body.name,
            location: req.body?.location,
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        });

        res.status(200).json({
          data: business,
        });
      } catch (err: any) {
        return ApiError(err.message, 404, next);
      }
    },
    {
      body: createBusinessSchema,
    }
  );

  getBusiness = requestHandler(async (req, res, next) => {
    try {
      const user = req.user;

      const business = await this._p.business.findFirstOrThrow({
        where: {
          userId: user?.id,
        },
      });

      res.status(200).json({
        data: business,
      });
    } catch (err: any) {
      return ApiError(err.message, 404, next);
    }
  });
}
