"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const parser_1 = require("../middlewares/parser");
const express_fingerprint_1 = __importDefault(require("@shwao/express-fingerprint"));
exports.authRouter = express_1.default.Router();
exports.authRouter.use((0, express_fingerprint_1.default)([
    express_fingerprint_1.default.useragent(),
    express_fingerprint_1.default.geoIp(),
    express_fingerprint_1.default.ip(),
    express_fingerprint_1.default.dnt(),
]));
exports.authRouter.post("/login", parser_1.formParser, auth_controller_1.AuthController.login);
exports.authRouter.post("/logout", auth_controller_1.AuthController.logout);
exports.authRouter.get("/logout", auth_controller_1.AuthController.logout);
