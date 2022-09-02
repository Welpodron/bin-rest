"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertValue = exports.convertToArray = exports.convertToObject = exports.convertToBoolean = exports.convertToNumber = void 0;
var is_1 = require("./is");
var convertToNumber = function (value) { return Number(value); };
exports.convertToNumber = convertToNumber;
var convertToBoolean = function (value) { return value === "true"; };
exports.convertToBoolean = convertToBoolean;
var convertToObject = function (object) {
    var convertedObject = {};
    Object.entries(object).forEach(function (entry) {
        var key = entry[0], value = entry[1];
        var convertedValue = (0, exports.convertValue)(value);
        if (convertedValue != null)
            convertedObject[key] = convertedValue;
    });
    return convertedObject;
};
exports.convertToObject = convertToObject;
var convertToArray = function (array) {
    var convertedArray = [];
    array.forEach(function (value) {
        var convertedValue = (0, exports.convertValue)(value);
        if (convertedValue != null)
            convertedArray.push(convertedValue);
    });
    return convertedArray;
};
exports.convertToArray = convertToArray;
var convertValue = function (value) {
    if (value == null || value === "")
        return null;
    if ((0, is_1.isStringBoolean)(value))
        return (0, exports.convertToBoolean)(value);
    if ((0, is_1.isNumber)(value))
        return (0, exports.convertToNumber)(value);
    if ((0, is_1.isArray)(value))
        return (0, exports.convertToArray)(value);
    if ((0, is_1.isObject)(value))
        return (0, exports.convertToObject)(value);
    return value;
};
exports.convertValue = convertValue;
