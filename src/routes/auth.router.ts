import express from "express";

import { AuthController } from "../controllers/auth.controller";

import { formParser } from "../middlewares/parser";

import Fingerprint from "@shwao/express-fingerprint";

export const authRouter = express.Router();

authRouter.use(
  Fingerprint([
    Fingerprint.useragent(),
    Fingerprint.geoIp(),
    Fingerprint.ip(),
    Fingerprint.dnt(),
  ])
);

authRouter.post("/login", formParser, AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/logout", AuthController.logout);
authRouter.post("/refresh", AuthController.refresh);
authRouter.get("/refresh", AuthController.refresh);
