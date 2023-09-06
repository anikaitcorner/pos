import { sign, verify, SignOptions, JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  interface JwtPayload {
    sub: string;
    username: string;
    email: string;
  }
}
