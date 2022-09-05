"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    // use logger here probably ???
    const message = err.message || http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    console.error(err);
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
};
exports.errorHandler = errorHandler;
