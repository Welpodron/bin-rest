"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModelSort = exports.buildModelGet = exports.buildModelWhere = exports.getModelSortableFields = exports.getModelFilterableFields = exports.getModelSelectableFields = void 0;
var sequelize_1 = require("sequelize");
var is_1 = require("./is");
var GENERIC_OPERATIONS = ["eq", "ne"];
var NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
var STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];
// export interface IModelWrapper extends Model {
//   __getSpecialFields: (
//     key: string
//   ) => [string, ModelAttributeColumnOptions<Model<any, any>>][];
// }
var getModelSelectableFields = function (model) {
    return model.__getSpecialFields("__isSelectable").map(function (field) { return field[0]; });
};
exports.getModelSelectableFields = getModelSelectableFields;
var getModelFilterableFields = function (model) {
    return model.__getSpecialFields("__isFilterable").map(function (field) { return ({
        field: field[0],
        type: field[1].type,
    }); });
};
exports.getModelFilterableFields = getModelFilterableFields;
var getModelSortableFields = function (model) {
    return model.__getSpecialFields("__isSortable").map(function (field) { return field[0]; });
};
exports.getModelSortableFields = getModelSortableFields;
var buildModelWhere = function (model, where) {
    if (!(0, is_1.isObject)(where))
        return undefined;
    var result = {};
    var filterableFields = (0, exports.getModelFilterableFields)(model);
    filterableFields.forEach(function (filterableField) {
        var fieldName = filterableField.field, fieldType = filterableField.type;
        if (!where.hasOwnProperty(fieldName))
            return;
        var filters = where[fieldName];
        if (!(0, is_1.isObject)(filters))
            return;
        result[fieldName] = {};
        Object.entries(filters).forEach(function (filter) {
            var operation = filter[0], comparison = filter[1];
            var lastComparison = (0, is_1.isArray)(comparison)
                ? comparison[comparison.length - 1]
                : comparison;
            if (GENERIC_OPERATIONS.includes(operation)) {
                if ((0, is_1.isNumber)(lastComparison) ||
                    (0, is_1.isString)(lastComparison) ||
                    (0, is_1.isBoolean)(lastComparison)) {
                    result[fieldName][sequelize_1.Op[operation]] = lastComparison;
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
var buildModelGet = function (model, get) {
    if (!(0, is_1.isArray)(get))
        return undefined;
    var result = [];
    var getUniqueized = new Set(get);
    var selectableFields = (0, exports.getModelSelectableFields)(model);
    getUniqueized.forEach(function (getUnique) {
        if (!selectableFields.includes(getUnique))
            return;
        result.push(getUnique);
    });
    return result.length ? result : selectableFields;
};
exports.buildModelGet = buildModelGet;
var buildModelSort = function (model, sort) {
    if (!(0, is_1.isObject)(sort))
        return undefined;
    var result = [];
    var sortSliced = Object.entries(sort).slice(-2);
    var sortableFields = (0, exports.getModelSortableFields)(model);
    sortSliced.forEach(function (sortArr) {
        var sortField = sortArr[0], sortDirection = sortArr[1];
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
