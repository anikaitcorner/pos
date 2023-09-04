import express, { Application } from "express";
import sanitizedConfig from "./config";
import { hello } from "@/controller";

const mountServer = async (app: Application) => {
  const server = app.listen(sanitizedConfig.PORT);

  console.log(hello);

  server.on("listening", () => {
    console.log(`🚀Server runnig on http://localhost:${sanitizedConfig.PORT}`);
  });
};

mountServer(express());
