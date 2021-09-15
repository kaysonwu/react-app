import type { IncomingHttpHeaders } from 'http';

function isJson(type: string): boolean {
  return type.indexOf('/json') !== -1 || type.indexOf('+json') !== -1;
}

export default function unserizlize<T = unknown>(data: T, headers: IncomingHttpHeaders): T {
  return isJson(headers['content-type']!) ? JSON.parse(data as unknown as string) : data;
}
