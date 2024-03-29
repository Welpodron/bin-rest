"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const parser_1 = require("../middlewares/parser");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/users", user_controller_1.UserController.getAll);
exports.userRouter.post("/user", parser_1.formParser, user_controller_1.UserController.create);
