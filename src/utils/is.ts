export function is<T>(type: string, value: unknown): value is T {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type.toLowerCase();
}

export function isPlainObject<V = unknown>(value: unknown): value is Record<string, V> {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
