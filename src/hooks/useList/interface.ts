import { Key } from 'react';
import { PaginationProps } from 'antd/lib/pagination';
import { ErrorResponse } from '@/utils/request';

export interface RecordType {
  id: Key;
  [key: string]: any;
}

export type ErrorEventHandler = (error: ErrorResponse) => void;
export type DataSource<T> = { dataSource: T[]; pagination: PaginationProps };
