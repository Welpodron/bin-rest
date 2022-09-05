"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModelLimit = exports.buildModelSort = exports.buildModelGet = exports.buildModelWhere = exports.getModelSortableFields = exports.getModelFilterableFields = exports.getModelSelectableFields = void 0;
const sequelize_1 = require("sequelize");
const converter_1 = require("./converter");
const is_1 = require("./is");
const GENERIC_OPERATIONS = ["eq", "ne"];
const NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
const STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];
// export interface IModelWrapper extends Model {
//   __getSpecialFields: (
//     key: string
//   ) => [string, ModelAttributeColumnOptions<Model<any, any>>][];
// }
// TODO: DRY
const getModelSelectableFields = (model, _ignoreProtection) => {
    if (_ignoreProtection)
        return Object.entries(model.getAttributes()).map((field) => field[0]);
    return model.__getSpecialFields("__isSelectable").map((field) => field[0]);
};
exports.getModelSelectableFields = getModelSelectableFields;
const getModelFilterableFields = (model, _ignoreProtection) => {
    if (_ignoreProtection)
        return Object.entries(model.getAttributes()).map((field) => ({
            field: field[0],
            type: field[1].type,
        }));
    return model.__getSpecialFields("__isFilterable").map((field) => ({
        field: field[0],
        type: field[1].type,
    }));
};
exports.getModelFilterableFields = getModelFilterableFields;
const getModelSortableFields = (model, _ignoreProtection) => {
    if (_ignoreProtection)
        return Object.entries(model.getAttributes()).map((field) => field[0]);
    return model.__getSpecialFields("__isSortable").map((field) => field[0]);
};
exports.getModelSortableFields = getModelSortableFields;
const buildModelWhere = (config) => {
    if (config._whereRawUnsafe != null)
        return config._whereRawUnsafe;
    if (!(0, is_1.isObject)(config.where))
        return undefined;
    const result = {};
    const filterableFields = (0, exports.getModelFilterableFields)(config.model, config._ignoreProtection);
    filterableFields.forEach((filterableField) => {
        const { field: fieldName, type: fieldType } = filterableField;
        if (!config.where.hasOwnProperty(fieldName))
            return;
        const filters = config.where[fieldName];
        if (!(0, is_1.isObject)(filters))
            return;
        result[fieldName] = {};
        Object.entries(filters).forEach((filter) => {
            const [operation, comparison] = filter;
            const lastComparison = (0, is_1.isArray)(comparison)
                ? comparison[comparison.length - 1]
                : comparison;
            if (GENERIC_OPERATIONS.includes(operation)) {
                if ((0, is_1.isNumber)(lastComparison) ||
                    (0, is_1.isString)(lastComparison) ||
                    (0, is_1.isBoolean)(lastComparison)) {
                    result[fieldName][sequelize_1.Op[operation]] =
                        lastComparison;
                }
                return;
            }
            // Only unique to string operations
            // TODO: Rework to DRY!
            if (STRING_OPERATIONS.includes(operation)) {
                if (fieldType instanceof sequelize_1.DataTypes.STRING) {
                    if ((0, is_1.isNumber)(lastComparison) ||
                        (0, is_1.isString)(lastComparison) ||
                        (0, is_1.isBoolean)(lastComparison)) {
                        result[fieldName][sequelize_1.Op[operation]] =
                            lastComparison;
                    }
                }
                return;
            }
            if (NUMBER_OPERATIONS.includes(operation)) {
                if (fieldType instanceof sequelize_1.DataTypes.NUMBER) {
                    if ((0, is_1.isNumber)(lastComparison)) {
                        result[fieldName][sequelize_1.Op[operation]] =
                            lastComparison;
                    }
                }
                return;
            }
        });
        if (!Object.getOwnPropertySymbols(result[fieldName]).length) {
            delete result[fieldName];
        }
    });
    return Object.keys(result).length ? result : undefined;
};
exports.buildModelWhere = buildModelWhere;
const buildModelGet = (config) => {
    if (config._getRawUnsafe != null)
        return config._getRawUnsafe;
    const selectableFields = (0, exports.getModelSelectableFields)(config.model, config._ignoreProtection);
    if (!(0, is_1.isArray)(config.get))
        return selectableFields;
    const result = [];
    const getUniqueized = new Set(config.get);
    getUniqueized.forEach((getUnique) => {
        if (!selectableFields.includes(getUnique))
            return;
        result.push(getUnique);
    });
    return result.length ? result : selectableFields;
};
exports.buildModelGet = buildModelGet;
const buildModelSort = (config) => {
    if (config._sortRawUnsafe != null)
        return config._sortRawUnsafe;
    if (!(0, is_1.isObject)(config.sort))
        return undefined;
    const result = [];
    const sortSliced = Object.entries(config.sort).slice(-2);
    const sortableFields = (0, exports.getModelSortableFields)(config.model, config._ignoreProtection);
    sortSliced.forEach((sortArr) => {
        let [sortField, sortDirection] = sortArr;
        if (!sortableFields.includes(sortField))
            return;
        if (!(0, is_1.isString)(sortDirection))
            return;
        sortDirection = sortDirection.toLowerCase();
        if (sortDirection !== "desc" && sortDirection !== "asc")
            return;
        result.push([sortField, sortDirection]);
    });
    return result.length ? result : undefined;
};
exports.buildModelSort = buildModelSort;
const buildModelLimit = (config) => {
    if (config._limitRawUnsafe != null)
        return config._limitRawUnsafe;
    if (!(0, is_1.isNumber)(config.limit))
        return undefined;
    return (0, converter_1.convertToNumber)(config.limit);
};
exports.buildModelLimit = buildModelLimit;
