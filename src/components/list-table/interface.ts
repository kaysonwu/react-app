import { ColumnType as AntdColumnType } from 'antd/lib/table';
import { Key } from '../column-select/interface';

export { Key };

export type ColumnTypeEx = { key: Key, selected: boolean | null, required?: boolean };

export interface ColumnType<T = any> extends AntdColumnType<T> {
  defaultSelected?: boolean;
  required?: boolean;
}

type ColumnGroupTypeBase<T = any> = { key: Key } & Omit<AntdColumnType<T>, 'dataIndex'>;

export interface ColumnGroupType<T = any> extends ColumnGroupTypeBase {
  children: ColumnsType<T>;
}

export type ColumnsType<T = any> = (ColumnGroupType<T> | ColumnType<T>)[];

export type ColumnsTypeEx<T = any> = ColumnTypeEx[] & ColumnsType<T>;

export interface ColumnProps<T = any> extends ColumnType<T> {
  children?: null;
}

export interface ColumnGroupProps<T = any> extends ColumnGroupTypeBase {
  children: React.ReactElement<ColumnProps<T>> | React.ReactElement<ColumnProps<T>>[];
}
