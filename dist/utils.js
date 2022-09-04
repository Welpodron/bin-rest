"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilter = void 0;
const sequelize_1 = require("sequelize");
const is_1 = require("./utils/is");
const BASIC_OPERATIONS = ["eq", "ne"];
const NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
const STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];
const buildFilter = (filters) => {
    const _filter = {};
    filters.forEach((filter) => {
        if (!filter.filters.length)
            return;
        const field = filter.field;
        _filter[field] = {};
        filter.filters.forEach((filter) => {
            const [operation, comparison] = filter;
            if (BASIC_OPERATIONS.includes(operation) ||
                STRING_OPERATIONS.includes(operation)) {
                const lastValue = (0, is_1.isArray)(comparison)
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
