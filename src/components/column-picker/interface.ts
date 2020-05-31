import { Key, ReactNode } from 'react';
import { FixedType } from 'rc-table/lib/interface';

export { Key, FixedType };

export interface ColumnType {
  key: Key;
  visible: boolean | null;
  defaultVisible?: boolean;
  title?: ReactNode;
  fixed?: FixedType;
  children?: ColumnType[];
  required?: boolean;
}
