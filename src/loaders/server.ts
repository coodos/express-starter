import { createExpressServer, InternalServerError } from "routing-controllers";
import path from "path";
import { AppDataSource } from "./database";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type SfynxConfig = {
  port?: number;
  routePrefix?: string;
};

export class Sfynx {
  public static async start(config: SfynxConfig = {}) {
    this.loadDatabase()
      .then(() => console.log("initialised database"))
      .catch(() => {
        throw new InternalServerError("Failed to initialise database");
      });
    const app = createExpressServer({
      routePrefix: config.routePrefix ?? "/",
      controllers: [path.resolve(__dirname, "../modules/**/*.controller.ts")],
      middlewares: [
        path.resolve(__dirname, "../modules/app/**/*.middleware.ts"),
      ],
      interceptors: [
        path.resolve(__dirname, "../modules/app/**/*.interceptor.ts"),
      ],
    });
    app.listen(config.port ?? 1209);
  }

  private static async loadDatabase() {
    AppDataSource.initialize();
  }
}
