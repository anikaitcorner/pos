import { PrismaClient } from "@prisma/client";

export abstract class Controller {
  protected _p: PrismaClient;

  constructor() {
    this._p = new PrismaClient();
  }
}
