/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useMemo } from 'react';
import Debounce from 'lodash.debounce';
import { RequestConfig, ErrorResponse, request, get } from './request';

type Service<T> = string | RequestConfig | ((...args: any) => Promise<T>);
type MutateAction<T> = (data: T | ((data: T) => T)) => void;

interface Options {
  // 抖动延迟时间
  debounce?: number;
}

interface State<T> {
  // 数据
  data?: T;
  // 指示是否正在请求
  loading?: boolean;
  // 错误响应
  error?: ErrorResponse;
}

interface Action<T> extends Partial<Omit<State<T>, 'data'>> {
  type: 'loading'
    | 'saveData'
    | 'error';
  data?: T | ((data: T) => T);
}

function reducer<T>(state: State<T>, action: Action<T>) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'saveData': {
      let { data } = action;

      if (typeof data === 'function') {
        data = (data as Function)(action.data);
      }

      return { ...state, data, loading: false };
    }
    case 'error':
      return { ...state, error: action.error!, loading: false };
    default:
      return state;
  }
}

function normalizeService<T>(service: Service<T>) {
  if (typeof service === 'string') {
    return () => get(service);
  }

  if (typeof service === 'object') {
    return () => request(service);
  }

  return service;
}

function useRequest<T = undefined>(
  service: Service<T>,
  initialData?: T,
  options: Options = {},
): [T, (...args: any) => void, boolean | undefined, MutateAction<T>, ErrorResponse | undefined] {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, { data: initialData });
  const mutate: MutateAction<T> = data => dispatch({ type: 'saveData', data });
  const action = useMemo(() => {
    const { debounce } = options;
    const request = normalizeService(service);
    const onSuccess = (data: T) => dispatch({ type: 'saveData', data });
    const onError = (error: ErrorResponse) => dispatch({ type: 'error', error });

    function action(...args: any) {
      dispatch({ type: 'loading' });
      request(...args).then(onSuccess).catch(onError);
    }

    if (debounce) {
      return Debounce(action, debounce);
    }

    return action;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data as T, action, loading, mutate, error];
}

export default useRequest;
