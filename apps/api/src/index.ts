import express, { Application } from "express";
import sanitizedConfig from "./config";
import { errorMiddleware, isAuthenticated } from "@/middleware";
import {
  userRoutes,
  authRoutes,
  businessRoutes,
  categoryRoutes,
  unitRoutes,
  productRoutes,
} from "@/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const mountServer = async (app: Application) => {
  const server = app.listen(sanitizedConfig.PORT);

  server.on("listening", () => {
    console.log(`🚀Server runnig on http://localhost:${sanitizedConfig.PORT}`);
  });

  const allowedOrigin = ["http://localhost:5173", "http://127.0.0.1:5173"];

  /**
   *
   * System Middleware
   */
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      credentials: true,
      origin(requestOrigin, callback) {
        if (requestOrigin && allowedOrigin.includes(requestOrigin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    })
  );

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
  app.use("/api/v1/business", isAuthenticated, businessRoutes);
  app.use("/api/v1/categories", isAuthenticated, categoryRoutes);
  app.use("/api/v1/units", isAuthenticated, unitRoutes);
  app.use("/api/v1/products", isAuthenticated, productRoutes);

  /**
   * Error Handling
   */

  app.use(errorMiddleware);
};

mountServer(express());
