"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParser = void 0;
var converter_1 = require("../utils/converter");
var queryParser = function () {
    return function (req, res, next) {
        req.query = (0, converter_1.convertToObject)(req.query);
        next();
    };
};
exports.queryParser = queryParser;
