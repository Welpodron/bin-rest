"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncControllerRequest = void 0;
const asyncControllerRequest = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
};
exports.asyncControllerRequest = asyncControllerRequest;
