export function getDataType(data: any): string {
  return Object.prototype.toString.call(data);
}

export function isString(data: any): boolean {
  return getDataType(data) === '[object String]';
}

export function isNumber(data: any): boolean {
  return getDataType(data) === '[object Number]';
}

export function isObject(data: any): boolean {
  return getDataType(data) === '[object Object]';
}

export function isArray(data: any): boolean {
  return getDataType(data) === '[object Array]';
}

export function isBoolean(data: any): boolean {
  return data === true || data === false || getDataType(data) === '[object Boolean]';
}

export function isFunction(data: any): boolean {
  return typeof data === 'function';
}

export function isDate(data: any): boolean {
  return data instanceof Date;
}

export function isInteger(data: any): boolean {
  if (!isNumber(data)) {
    return false;
  }
  return parseInt(data) === parseFloat(data);
}

export function isFloat(data: any): boolean {
  if (!isNumber(data)) {
    return false;
  }
  return parseInt(data) !== parseFloat(data);
}

export function isNull(data: any): boolean {
  return getDataType(data) === '[object Null]';
}

export function isUndefined(data: any): boolean {
  return getDataType(data) === '[object Undefined]';
}

export function isNil(data: any): boolean {
  return isUndefined(data) || isNull(data);
}
