import { Model, ModelAttributeColumnOptions, Op, DataTypes } from "sequelize";

import { isObject, isArray, isString, isNumber, isBoolean } from "./is";

const GENERIC_OPERATIONS = ["eq", "ne"];
const NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
const STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];

// type StaticImplements<I extends new (...args: any[]) => any, C extends I> = InstanceType<I>;

export interface IAttributeWrapper<M extends Model>
  extends ModelAttributeColumnOptions<M> {
  __isSelectable?: boolean;
  __isSortable?: boolean;
  __isFilterable?: boolean;
}

export type TStaticImplements<
  I extends new (...args: any[]) => any,
  C extends I
> = InstanceType<I>;

export interface IModelWrapper {
  new (...args: any[]): Model;
  __getSpecialFields: (
    key: string
  ) => [string, ModelAttributeColumnOptions<Model<any, any>>][];
}

// export interface IModelWrapper extends Model {
//   __getSpecialFields: (
//     key: string
//   ) => [string, ModelAttributeColumnOptions<Model<any, any>>][];
// }

export const getModelSelectableFields = (model: IModelWrapper) => {
  return model.__getSpecialFields("__isSelectable").map((field) => field[0]);
};

export const getModelFilterableFields = (model: IModelWrapper) => {
  return model.__getSpecialFields("__isFilterable").map((field) => ({
    field: field[0],
    type: field[1].type,
  }));
};

export const getModelSortableFields = (model: IModelWrapper) => {
  return model.__getSpecialFields("__isSortable").map((field) => field[0]);
};

export const buildModelWhere = (
  model: IModelWrapper,
  where: Record<string, string | Array<string>>
) => {
  if (!isObject(where)) return undefined;

  const result: Record<string, any> = {};

  const filterableFields = getModelFilterableFields(model);

  filterableFields.forEach((filterableField) => {
    const { field: fieldName, type: fieldType } = filterableField;

    if (!where.hasOwnProperty(fieldName)) return;

    const filters = where[fieldName];

    if (!isObject(filters)) return;

    result[fieldName] = {};

    Object.entries(filters).forEach((filter) => {
      const [operation, comparison] = filter;

      const lastComparison = isArray(comparison)
        ? comparison[comparison.length - 1]
        : comparison;

      if (GENERIC_OPERATIONS.includes(operation)) {
        if (
          isNumber(lastComparison) ||
          isString(lastComparison) ||
          isBoolean(lastComparison)
        ) {
          result[fieldName][Op[operation as keyof typeof Op]] = lastComparison;
        }
        return;
      }
      // Only unique to string operations
      // TODO: Rework to DRY!
      if (STRING_OPERATIONS.includes(operation)) {
        if (fieldType instanceof DataTypes.STRING) {
          if (
            isNumber(lastComparison) ||
            isString(lastComparison) ||
            isBoolean(lastComparison)
          ) {
            result[fieldName][Op[operation as keyof typeof Op]] =
              lastComparison;
          }
        }
        return;
      }

      if (NUMBER_OPERATIONS.includes(operation)) {
        if (fieldType instanceof DataTypes.NUMBER) {
          if (isNumber(lastComparison)) {
            result[fieldName][Op[operation as keyof typeof Op]] =
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

export const buildModelGet = (model: IModelWrapper, get: Array<string>) => {
  if (!isArray(get)) return undefined;

  const result: Array<string> = [];

  const getUniqueized = new Set(get);

  const selectableFields = getModelSelectableFields(model);

  getUniqueized.forEach((getUnique) => {
    if (!selectableFields.includes(getUnique)) return;

    result.push(getUnique);
  });

  return result.length ? result : selectableFields;
};

export const buildModelSort = (
  model: IModelWrapper,
  sort: Record<string, string>
) => {
  if (!isObject(sort)) return undefined;

  const result: Array<[string, string]> = [];

  const sortSliced = Object.entries(sort).slice(-2);

  const sortableFields = getModelSortableFields(model);

  sortSliced.forEach((sortArr) => {
    let [sortField, sortDirection] = sortArr;

    if (!sortableFields.includes(sortField)) return;

    if (!isString(sortDirection)) return;

    sortDirection = sortDirection.toLowerCase();

    if (sortDirection !== "desc" && sortDirection !== "asc") return;

    result.push([sortField, sortDirection]);
  });

  return result.length ? result : undefined;
};
