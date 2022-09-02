import { isArray, isObject, isNumber, isStringBoolean } from "./is";

export const convertToNumber = (value: any) => Number(value);

export const convertToBoolean = (value: any) => value === "true";

export const convertToObject = (object: Object) => {
  const convertedObject: Record<any, any> = {};

  Object.entries(object).forEach((entry) => {
    const [key, value] = entry;
    const convertedValue = convertValue(value);
    if (convertedValue != null) convertedObject[key] = convertedValue;
  });

  return convertedObject;
};

export const convertToArray = (array: Array<any>) => {
  const convertedArray: Array<any> = [];

  array.forEach((value) => {
    const convertedValue = convertValue(value);
    if (convertedValue != null) convertedArray.push(convertedValue);
  });

  return convertedArray;
};

export const convertValue = (value: any) => {
  if (value == null || value === "") return null;

  if (isStringBoolean(value)) return convertToBoolean(value);

  if (isNumber(value)) return convertToNumber(value);

  if (isArray(value)) return convertToArray(value);

  if (isObject(value)) return convertToObject(value);

  return value;
};
