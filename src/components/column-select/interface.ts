import { Key, ReactNode } from 'react';
import { FixedType } from 'rc-table/lib/interface';

export { Key, FixedType };

export interface ColumnType {
  key: Key;
  selected: boolean | null;
  defaultSelected?: boolean;
  title?: ReactNode;
  fixed?: FixedType;
  children?: ColumnType[];
  required?: boolean;
}
