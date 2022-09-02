"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = exports.isBoolean = exports.isStringBoolean = exports.isArray = exports.isObject = void 0;
var isObject = function (value) { return value && value.constructor === Object; };
exports.isObject = isObject;
var isArray = function (value) { return Array.isArray(value); };
exports.isArray = isArray;
var isStringBoolean = function (value) {
    return value === "true" || value === "false";
};
exports.isStringBoolean = isStringBoolean;
var isBoolean = function (value) { return value === true || value === false; };
exports.isBoolean = isBoolean;
var isString = function (value) { return typeof value === "string"; };
exports.isString = isString;
var isNumber = function (value) {
    return !isNaN(parseInt(value)) && isFinite(value);
};
exports.isNumber = isNumber;
