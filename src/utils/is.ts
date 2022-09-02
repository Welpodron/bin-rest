export const isObject = (value: any) => value && value.constructor === Object;

export const isArray = (value: any) => Array.isArray(value);

export const isStringBoolean = (value: any) =>
  value === "true" || value === "false";

export const isBoolean = (value: any) => value === true || value === false;

export const isString = (value: any) => typeof value === "string";

export const isNumber = (value: any) =>
  !isNaN(parseInt(<string>value)) && isFinite(value);
