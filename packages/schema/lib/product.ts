import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  categoryId: z.string().optional(),
  thumbnail: z.string().optional(),
});
