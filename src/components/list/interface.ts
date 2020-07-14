import { ReactElement, Key } from 'react';
import { ColumnType as ColumnTypeBase } from 'antd/lib/table';

export interface ColumnType<T = unknown> extends ColumnTypeBase<T> {
  defaultVisible?: boolean;
  required?: boolean;
}

export interface ColumnGroupType<T = unknown> extends Omit<ColumnType<T>, 'dataIndex'> {
  key: Key;
  children: ColumnsType<T>;
}

export type ColumnsType<T = unknown> = (ColumnType<T> | ColumnGroupType<T>)[];

export interface ColumnProps<T = unknown> extends ColumnType<T> {
  children?: null;
}

export interface ColumnGroupProps<T = unknown> extends Omit<ColumnGroupType<T>, 'children'> {
  children: ReactElement<ColumnProps<T>> | ReactElement<ColumnProps<T>>[];
}

export interface NormalizeColumnType<T = unknown> extends ColumnType<T> {
  key: Key;
  visible: boolean;
}

export interface NormalizeColumnGroupType<T = unknown> extends ColumnGroupType<T> {
  visible: boolean | null;
  children: NormalizeColumnsType<T>;
}

export type NormalizeColumnsType<T = unknown> = (
  NormalizeColumnType<T> | NormalizeColumnGroupType<T>
)[];
