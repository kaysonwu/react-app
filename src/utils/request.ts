import axios, { Method, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
import { stringify } from 'qs';
import is from '@sindresorhus/is';
import { message } from 'antd';
import type { ClientRequest } from 'http';
import type { FormInstance } from 'antd/lib/form';
import type { FieldData } from 'rc-field-form/lib/interface';
import { formatMessage } from './locale';
import { push } from './route';

interface RequestConfig extends AxiosRequestConfig {
  form?: FormInstance;
  withoutInterceptor?: number[];
}

interface Response<T = unknown> extends AxiosResponse<T> {
  config: RequestConfig;
}

interface RequestError<T = unknown> extends Error {
  config: RequestConfig;
  code?: string;
  request?: XMLHttpRequest | ClientRequest;
  response?: Response<T>;
  isAxiosError: boolean;
  toJSON: () => Record<string, unknown>;
}

interface InterceptorManager<T, E extends Error = RequestError> {
  use(onFulfilled?: (value: T) => unknown, onRejected?: (error: E) => unknown): number;
  eject(id: number): void;
}

interface RequestInstance {
  (config: RequestConfig): AxiosPromise;
  (url: string, config?: RequestConfig): AxiosPromise;
  defaults: RequestConfig;
  interceptors: {
    request: InterceptorManager<RequestConfig>;
    response: InterceptorManager<Response>;
  };
  getUri(config?: RequestConfig): string;
  request<T = unknown, R = Response<T>>(config: RequestConfig): Promise<R>;
  get<T = unknown, R = Response<T>>(
    url: string,
    params?: RequestConfig['params'],
    config?: RequestConfig,
  ): Promise<T | R>;
  delete<T = unknown, R = Response<T>>(
    url: string,
    params?: RequestConfig['params'],
    config?: RequestConfig,
  ): Promise<T | R>;
  head<T = unknown, R = Response<T>>(
    url: string,
    params?: RequestConfig['params'],
    config?: RequestConfig,
  ): Promise<T | R>;
  options<T = unknown, R = Response<T>>(
    url: string,
    params?: RequestConfig['params'],
    config?: RequestConfig,
  ): Promise<T | R>;
  post<T = unknown, R = Response<T>>(
    url: string,
    data?: RequestConfig['data'],
    config?: RequestConfig,
  ): Promise<T | R>;
  put<T = unknown, R = Response<T>>(
    url: string,
    data?: RequestConfig['data'],
    config?: RequestConfig,
  ): Promise<T | R>;
  patch<T = unknown, R = Response<T>>(
    url: string,
    data?: RequestConfig['data'],
    config?: RequestConfig,
  ): Promise<T | R>;
}

const { transformRequest } = axios.defaults;
const instance = axios.create({
  headers: { Accept: 'application/json, text/plain, */*' },
  paramsSerializer: params => stringify(params, { skipNulls: true }),
  transformRequest: (data, headers) => {
    // Plain object are resolved to querystring first.
    if (is.plainObject(data)) {
      return stringify(data, { skipNulls: true });
    }

    if (Array.isArray(transformRequest)) {
      return transformRequest.reduce((d, f) => f(d, headers), data);
    }

    if (transformRequest) {
      return transformRequest(data, headers);
    }

    return data;
  },
}) as RequestInstance;

export function normalizeMessage(response: unknown, defaultMessage = ''): string {
  if (is.string(response)) {
    return response || defaultMessage;
  }

  if (!is.plainObject(response)) {
    return defaultMessage;
  }

  // For Laravel:
  // {"message":"The given data was invalid.","errors":{"field": ["error message"]}}
  if (is.plainObject(response.errors)) {
    return (response.errors[Object.keys(response.errors)[0]] as string[])[0];
  }

  return (response.message as string) || defaultMessage;
}

export function convertEntityErrorToFieldData(data: unknown): FieldData[] {
  if (!is.plainObject(data)) {
    return [];
  }

  // For Laravel:
  // {"message":"The given data was invalid.","errors":{"field": ["error message"]}}
  if (is.plainObject(data.errors)) {
    return Object.keys(data.errors).map(key => ({
      name: key.replace(/\.\d+/g, ''),
      errors: (data.errors as Record<string, string[]>)[key],
      value: undefined,
    }));
  }

  // For Customize
  // {"field": "first error message"}
  return Object.keys(data).map(
    name => ({ name, errors: [data[name]], value: undefined } as FieldData),
  );
}

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const {
      config: { withoutInterceptor, method },
      status,
      data,
    } = response;

    // 不使用响应拦截器
    if (withoutInterceptor?.includes(status)) {
      return response;
    }

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method!.toUpperCase())) {
      message.success(
        normalizeMessage(data) ||
          formatMessage({
            id: `${method!.slice(0, 1).toUpperCase() + method!.slice(1).toLowerCase()} succeeded.`,
          }),
      );
    }

    // 转换 Laravel 分页对象到 antd 的分页组件属性
    if (is.plainObject(data) && 'current_page' in data) {
      return {
        dataSource: data.data,
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true,
          current: data.current_page,
          pageSize: data.per_page,
          total: data.total,
          pageSizeOptions: ['15', '30', '50', '100'],
        },
      };
    }

    return data;
  },
  error => {
    const {
      config: { withoutInterceptor, form },
      response,
    } = error;
    const { status, statusText, data } = response || { status: 0 };

    // 使用拦截器
    if (!withoutInterceptor?.includes(status)) {
      switch (status) {
        case 401: // 未登录
          push('login');
          break;
        case 403: // 未获得权限
        case 404: // 未找到数据
        case 419: // 认证令牌失效
        case 429: // 请求过快
        case 500: // 服务器错误
          message.error(normalizeMessage(data) || formatMessage({ id: statusText }));
          break;
        case 422: // 数据验证错误
          if (form) {
            form.setFields(convertEntityErrorToFieldData(data));
          } else {
            message.error(normalizeMessage(data) || formatMessage({ id: statusText }));
          }
          break;
        default:
          message.error(error.message);
          break;
      }

      return data;
    }

    throw error;
  },
);

// 重写 get、head、delete、options 方法，为其加上 params 参数
(['get', 'head', 'delete', 'options'] as Method[]).forEach(method => {
  // @ts-expect-error: known error
  instance[method] = <T = unknown, R = AxiosResponse<T>>(
    url: string,
    params?: RequestConfig['params'],
    config?: RequestConfig,
  ): Promise<T | R> => instance.request<T, R>({ ...config, method, url, params });
});

export const { getUri, request, get, post, put, patch, delete: del, head, options } = instance;
