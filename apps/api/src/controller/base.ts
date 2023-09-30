import { appDataSource } from "orm";
import { EntitySchema, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export abstract class Controller<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(Entity: EntityTarget<T>) {
    this.repository = appDataSource.getRepository(Entity);
  }
}
