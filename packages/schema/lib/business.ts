import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().nonempty(),
  location: z.string().optional(),
});
