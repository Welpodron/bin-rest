import { CONFIG } from "./config";

import express, { NextFunction, Response, Request } from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/handler";

import { SequelizeService } from "./services/sequelize.service";

import { queryParser } from "./middlewares/parser";

import { userRouter } from "./routes/user.router";
import { authRouter } from "./routes/auth.router";

const app = express();

app.use(queryParser);
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api", userRouter);

app.use(errorHandler);

(async () => {
  try {
    await SequelizeService.authenticate();
    console.log("Connection has been established successfully.");
    await SequelizeService.sync();
    console.log("All models were synchronized successfully.");

    app.listen(CONFIG.SERVER_PORT, () => {
      console.log(`Application started on localhost:${CONFIG.SERVER_PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // stop application here
  }
})();
