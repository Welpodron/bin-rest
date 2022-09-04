"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formParser = exports.queryParser = void 0;
const converter_1 = require("../utils/converter");
const queryParser = (req, res, next) => {
    req.query = (0, converter_1.convertToObject)(req.query);
    next();
};
exports.queryParser = queryParser;
const formidable_1 = __importDefault(require("formidable"));
const formParser = (req, res, next) => {
    const form = (0, formidable_1.default)();
    form.parse(req, (error, fields, files) => {
        console.error(error);
        req.body = { fields, files };
        next();
    });
};
exports.formParser = formParser;
