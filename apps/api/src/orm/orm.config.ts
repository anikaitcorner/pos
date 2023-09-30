import { DataSource } from "typeorm";
import { Business, Category, Product, Unit, User } from "./entity";

export const appDataSource = new DataSource({
  type: "mysql",
  database: "pos",
  username: "root",
  host: "localhost",
  port: 3306,
  entities: [User, Business, Product, Category, Unit],
  synchronize: true,
  logging: false,
});
