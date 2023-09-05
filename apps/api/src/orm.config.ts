import sanitizedConfig from "config";
import { DataSource } from "typeorm";
import { User } from "@/models";

export const appDataSource = new DataSource({
  type: "mysql",
  database: sanitizedConfig.DB_NAME,
  username: sanitizedConfig.DB_USER,
  password: sanitizedConfig.DB_PASS,
  entities: [User],
  logging: false,
  synchronize: sanitizedConfig.NODE_ENV === "development",
});
