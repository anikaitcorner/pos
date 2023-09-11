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
