import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://merul:password@localhost:5432/sfynx",
  synchronize: false,
  logging: false,
  entities: [path.resolve(__dirname, "./models/**/*.ts")],
  migrations: [path.resolve(__dirname, "./migrations/**/*.ts")],
  subscribers: [path.resolve(__dirname, "./subscribers/**/*.ts")],
  migrationsRun: true,
  migrationsTransactionMode: "all",
});
