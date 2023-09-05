import express, { Application } from "express";
import sanitizedConfig from "./config";
import { appDataSource } from "orm.config";
import { errorMiddleware } from "@/middleware";
import { userRoutes } from "@/routes";

const mountServer = async (app: Application) => {
  const server = app.listen(sanitizedConfig.PORT);

  server.on("listening", () => {
    console.log(`🚀Server runnig on http://localhost:${sanitizedConfig.PORT}`);
  });

  appDataSource
    .initialize()
    .then(() => {
      console.log(`Connected To Database`);
    })
    .catch((err) => {
      server.close();
    });

  /**
   *
   * System Middleware
   */

  app.use(express.json());
  app.use(express.urlencoded());

  /**
   * Api Routes
   */

  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      serverInfo: {
        protocol: req.protocol,
        host: req.hostname,
      },
      userInfo: {
        device: req.headers["user-agent"],
      },
    });
  });

  app.post("/api/v1", (req, res) => {
    res.status(200).json({
      error: "Post request is not allowed",
      statusCode: 404,
    });
  });

  app.use("/api/v1/users", userRoutes);

  /**
   * Error Handling
   */

  app.use(errorMiddleware);
};

mountServer(express());
