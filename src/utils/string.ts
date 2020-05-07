/**
 * Make a string's first character lowercase.
 */
export function lowerFirst(value: string) {
  return value.slice(0, 1).toLowerCase() + value.slice(1);
}

/**
 * Make a string's first character uppercase.
 */
export function upperFirst(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

/**
 * Uppercase the first character of each word in a string.
 */
export function upperWords(value: string) {  
  return value.replace(
    /([ \t\r\n\f\v]+|^)([a-z])/g, 
    (_, space, first) => space + first.toUpperCase(),
  );
} 

/**
 * Convert a value to studly caps case.
 */
export function studly(value: string) {
  return value.replace(
    /(?:[ \t\r\n\f\v-_]+|^)([a-z])/g, 
    (_, first) => first.toUpperCase(),
  );
}

/**
 * Convert a value to camel case.
 */
export function camel(value: string) {
  return lowerFirst(studly(value));
}
