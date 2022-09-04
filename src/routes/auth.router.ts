import express from "express";

import { AuthController } from "../controllers/auth.controller";

import { formParser } from "../middlewares/parser";

export const authRouter = express.Router();

authRouter.post("/login", formParser, AuthController.login);
