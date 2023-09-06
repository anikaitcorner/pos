import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});
