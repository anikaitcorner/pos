import { appDataSource } from "orm.config";
import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from "typeorm";

export abstract class Controller<TEntity extends ObjectLiteral> {
  protected repository: Repository<TEntity>;
  protected queryRunner = appDataSource.createQueryRunner();
  protected manager: EntityManager;

  constructor(entity: any) {
    this.repository = appDataSource.getRepository(entity);
    this.manager = this.queryRunner.manager;
  }
}
