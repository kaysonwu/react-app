import { UploadFile } from 'antd/lib/upload/interface';
import { ValueType } from './interface';

export function normalizeValue(value: ValueType) {
  return {
    uid: '1',
    url: typeof value === 'string' ? value : value.url,
    status: 'done',
  } as UploadFile;
}

export function formatBytes(size: number, delimiter = '') {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0; let sized = size;

  // eslint-disable-next-line no-plusplus
  for (; sized >= 1024 && i < 5; i++) {
    sized /= 1024;
  }

  return `${sized.toFixed(2)}${delimiter}${units[i]}`;
}
