import express, { Application } from "express";
import sanitizedConfig from "./config";
import { errorMiddleware } from "@/middleware";
import { userRoutes, authRoutes } from "@/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const mountServer = async (app: Application) => {
  const server = app.listen(sanitizedConfig.PORT);

  server.on("listening", () => {
    console.log(`🚀Server runnig on http://localhost:${sanitizedConfig.PORT}`);
  });

  /**
   *
   * System Middleware
   */
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors({}));

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

  app.use("/api/v1/auth", authRoutes);

  /**
   * Error Handling
   */

  app.use(errorMiddleware);
};

mountServer(express());
