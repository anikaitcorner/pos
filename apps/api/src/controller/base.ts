import { PrismaClient } from "@prisma/client";
import prisma from "db";

export abstract class Controller {
  protected _p: PrismaClient;

  constructor() {
    this._p = prisma;
  }
}
