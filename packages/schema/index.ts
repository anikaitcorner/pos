import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string().min(3, "Username must be atleast 8 character"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be atleast 8 character"),
  secret: z.string().min(6, "Please enter a secret key to create an user"),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(3, { message: "Username Or Email Required" }),
  password: z.string().min(8, "Password must be atleast 8 character"),
});

export const createBusinessSchema = z.object({
  name: z.string().nonempty(),
  location: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(3),
  categoryId: z.string().optional(),
  price: z.number().min(2),
  unitCost: z.number().min(2),
  unitType: z.string().min(2),
  businessId: z.string().describe("Business ID Required"),
  sku: z.string().min(2),
});

export const createCategorySchema = z.object({
  name: z.string().min(3),
});

export const createUnitSchema = z.object({
  name: z.string().min(3),
  shortName: z.string().min(2),
});
