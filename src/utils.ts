import { Op, where } from "sequelize";

import { isArray, isBoolean, isNumber, isString } from "./utils/is";

const BASIC_OPERATIONS = ["eq", "ne"];
const NUMBER_OPERATIONS = ["gt", "gte", "lt", "lte"];
const STRING_OPERATIONS = ["startsWith", "endsWith", "substring"];

export const buildFilter = (
  filters: Array<{
    field: string;
    filters: Array<[string, string | Array<any>]>;
  }>
) => {
  const _filter: Record<string, any> = {};

  filters.forEach((filter) => {
    if (!filter.filters.length) return;

    const field = filter.field;

    _filter[field] = {};

    filter.filters.forEach((filter) => {
      const [operation, comparison]: [string, string | Array<any>] = filter;

      if (
        BASIC_OPERATIONS.includes(operation) ||
        STRING_OPERATIONS.includes(operation)
      ) {
        const lastValue = isArray(comparison)
          ? comparison[comparison.length - 1]
          : comparison;

        if (
          isNumber(lastValue) ||
          isString(lastValue) ||
          isBoolean(lastValue)
        ) {
          _filter[field][Op[operation as keyof typeof Op]] = lastValue;
        }
      }

      if (NUMBER_OPERATIONS.includes(operation)) {
        if (isNumber(comparison)) {
          _filter[field][Op[operation as keyof typeof Op]] = comparison;
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
