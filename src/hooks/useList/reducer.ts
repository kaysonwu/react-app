import { Key } from 'react';
import { PaginationProps } from 'antd/lib/pagination';
import { ErrorResponse } from '@/utils/request';
import { RecordType, DataSource } from './interface';

export type DataType<T> = T[] | DataSource<T>;

export interface State<T extends RecordType = RecordType, D = DataType<T>, P = {}> {
  // 表单初始化道具
  formProps: P;
  // 列表数据
  data?: D;
  // 表单当前记录
  record?: T;
  // 指示列表是否正在加载
  loading?: boolean;
  // 指示表单是否正在初始化
  initialling?: boolean;
  // 指示表单是否正在提交
  submitting?: boolean;
  // 指示表单是否可见
  formVisible?: boolean;
  // 错误响应
  error?: ErrorResponse;
}

export type StoredEventHandler<T> = (data: T[], record: T) => T[];
export type DeletedEventHandler<T> = (data: T[], ids: Key[]) => T[];

export interface Action<T extends RecordType = RecordType> extends Partial<State<T>> {
  type: 'loading'
    | 'saveData'
    | 'openForm'
    | 'closeForm'
    | 'submitting'
    | 'storeRecord'
    | 'removeRecords'
    | 'saveFormProps'
    | 'error';
  ids?: Key[];
  stored?: StoredEventHandler<T> | false;
  deleted?: DeletedEventHandler<T>;
}

function updatePagination(pagination: PaginationProps, diff: number) {
  let { current, total } = pagination;
  total = Number(total) - diff;

  if (diff < 0) {
    // 新增时，将列表重置到 第一页
    current = 1;
  } else {
    const maxPage = Math.ceil(total / pagination.pageSize!);

    if (current! > maxPage) {
      current = maxPage;
    }
  }

  return { ...pagination, current, total };
}

function updateData<T extends RecordType, H extends (data: T[], ...args: any[]) => T[]>(
  handler: H,
  data: DataType<T> | undefined,
  ...args: H extends (data: T[], ...args: infer P) => T[] ? P : never) {
  if (Array.isArray(data)) {
    return handler(data, ...args);
  }

  let { dataSource = [], pagination = {} } = data || {};
  const { length } = dataSource;

  dataSource = handler(dataSource, ...args);
  const len = length - dataSource.length;

  if (len !== 0) {
    pagination = updatePagination(pagination, len);
  }

  return { dataSource, pagination };
}

function isNumberId<T extends RecordType>(data: DataType<T>) {
  const records = Array.isArray(data) ? data : data.dataSource;
  return typeof records[0].id === 'number';
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'saveData':
      return { ...state, data: action.data, loading: false };
    case 'openForm': {
      const { record, initialling = state.initialling } = action;
      return { ...state, record, initialling, formVisible: true };
    }
    case 'closeForm':
      return { ...state, formVisible: false };
    case 'submitting':
      return { ...state, submitting: true };
    case 'storeRecord': {
      const { data } = state;
      const { record, formVisible, stored } = action;
      return {
        ...state,
        submitting: false,
        formVisible,
        data: record && stored ? updateData(stored, data, record) : data,
      };
    }
    case 'removeRecords': {
      const { data } = state;
      const { deleted, ids } = action;
      const type = isNumberId(data!) ? Number : String;

      return { ...state, data: updateData(deleted!, data, ids!.map(id => type(id))) };
    }
    case 'saveFormProps':
      return { ...state, formProps: action.formProps!, initialling: false };
    case 'error': {
      const { error } = action;
      const { config: { method } } = error!;
      const newState = { ...state, error };

      switch (method!.toLowerCase()) {
        case 'post':
        case 'put':
          newState.submitting = false;
          break;
        case 'get':
          newState.loading = false;
          break;
        default:
          break;
      }

      return newState;
    }
    default:
      return state;
  }
}

export default reducer;
