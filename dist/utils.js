"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilter = void 0;
var sequelize_1 = require("sequelize");
var is_1 = require("./utils/is");
var BASIC_OPERATIONS = ["eq", "ne"];
var NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
var STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];
var buildFilter = function (filters) {
    var _filter = {};
    filters.forEach(function (filter) {
        if (!filter.filters.length)
            return;
        var field = filter.field;
        _filter[field] = {};
        filter.filters.forEach(function (filter) {
            var operation = filter[0], comparison = filter[1];
            if (BASIC_OPERATIONS.includes(operation) ||
                STRING_OPERATIONS.includes(operation)) {
                var lastValue = (0, is_1.isArray)(comparison)
                    ? comparison[comparison.length - 1]
                    : comparison;
                if ((0, is_1.isNumber)(lastValue) ||
                    (0, is_1.isString)(lastValue) ||
                    (0, is_1.isBoolean)(lastValue)) {
                    _filter[field][sequelize_1.Op[operation]] = lastValue;
                }
            }
            if (NUMBER_OPERATIONS.includes(operation)) {
                if ((0, is_1.isNumber)(comparison)) {
                    _filter[field][sequelize_1.Op[operation]] = comparison;
                }
            }
            // if (STRING_OPERATIONS.includes(operation)) {
            //   if (isNumber(comparison)) {
            //     _filter[field][Op[operation as keyof typeof Op]] = comparison;
            //   }
            // }
        });
        if (!Object.getOwnPropertySymbols(_filter[field]).length) {
            delete _filter[field];
        }
    });
    /*
    {
      name: {
        [Op.lt]: 1000,
        [Op.eq]: null
      }
    }
    */
    console.log(_filter);
    return _filter;
};
exports.buildFilter = buildFilter;
