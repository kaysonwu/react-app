import { stringify } from 'qs';
import { isPlainObject } from '@/utils/is';

export default function serialize<T = unknown>(data: T): string | T {
  return isPlainObject(data) ? stringify(data, { skipNulls: true }) : data;
}
