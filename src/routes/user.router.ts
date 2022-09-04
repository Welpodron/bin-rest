import express from "express";

import { UserController } from "../controllers/user.controller";

import { formParser } from "../middlewares/parser";

export const userRouter = express.Router();

userRouter.get("/users", UserController.getAll);
userRouter.post("/user", formParser, UserController.create);
