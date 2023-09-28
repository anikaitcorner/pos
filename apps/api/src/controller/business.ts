import { requestHandler } from "helper";
import { Controller } from "./base";
import { createBusinessSchema } from "@codernex/schema";
import { ApiError } from "@/utils";
import { Business } from "orm";

export class BusinessController extends Controller<Business> {
  constructor() {
    super(Business);
  }

  createBusiness = requestHandler(
    async (req, res, next) => {
      try {
        const user = req.user;

        if (!user) {
          return ApiError("No user found", 404, next);
        }

        const business = this.repository.create({
          name: req.body.name,
          location: req.body.location,
          users: [user],
        });

        await this.repository.save(business);

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

      const business = await this.repository.findOne({
        where: {
          users: {
            id: user?.id,
          },
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
