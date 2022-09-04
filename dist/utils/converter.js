"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertValue = exports.convertToArray = exports.convertToObject = exports.convertToBoolean = exports.convertToNumber = void 0;
const is_1 = require("./is");
const convertToNumber = (value) => Number(value);
exports.convertToNumber = convertToNumber;
const convertToBoolean = (value) => value === "true";
exports.convertToBoolean = convertToBoolean;
const convertToObject = (object) => {
    const convertedObject = {};
    Object.entries(object).forEach((entry) => {
        const [key, value] = entry;
        const convertedValue = (0, exports.convertValue)(value);
        if (convertedValue != null)
            convertedObject[key] = convertedValue;
    });
    return convertedObject;
};
exports.convertToObject = convertToObject;
const convertToArray = (array) => {
    const convertedArray = [];
    array.forEach((value) => {
        const convertedValue = (0, exports.convertValue)(value);
        if (convertedValue != null)
            convertedArray.push(convertedValue);
    });
    return convertedArray;
};
exports.convertToArray = convertToArray;
const convertValue = (value) => {
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
