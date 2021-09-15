/* eslint-disable camelcase */
import type { TableProps } from 'antd';

interface LaravelPaginator<T = unknown> {
  // 数据集合
  data: T[];
  // 当前页
  current_page: number;
  // 每页数
  per_page: number;
  // 总页数
  total: number;
}

function isLaravelPaginator(value: unknown): value is LaravelPaginator {
  return Object.prototype.hasOwnProperty.call(value || {}, 'current_page');
}

export default function paginate<T = unknown>(data: T): T | TableProps<unknown> {
  return isLaravelPaginator(data)
    ? {
        dataSource: data.data,
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true,
          current: data.current_page,
          pageSize: data.per_page,
          total: data.total,
          pageSizeOptions: ['15', '30', '50', '100'],
        },
      }
    : data;
}
